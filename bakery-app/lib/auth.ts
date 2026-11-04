import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "./prisma";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "noko-bakery-dev-secret-change-in-production";
const COOKIE_NAME = "noko-session";
const SESSION_DURATION_DAYS = 7;

export interface SessionPayload {
  userId: string;
  email: string;
  exp: number;
}

// ─────────────────────────────────────
// Password hashing
// ─────────────────────────────────────
export { hashPassword, verifyPassword } from "./password";

// ─────────────────────────────────────
// Session token signing
// ─────────────────────────────────────
function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(data)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature),
      )
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(data, "base64url").toString(),
    );

    if (payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────
// Session management
// ─────────────────────────────────────
export function createSession(userId: string, email: string): string {
  const payload: SessionPayload = {
    userId,
    email,
    exp: Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  };
  return signSession(payload);
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
    path: "/",
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: payload.userId },
  });

  if (!customer) return null;

  return {
    id: customer.id,
    email: customer.email,
    name: customer.name,
    phone: customer.phone,
    address: customer.address,
  };
}
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: user.id },
    select: { isAdmin: true },
  });

  return customer?.isAdmin ? user : null;
}

export async function getCurrentUserWithAdmin() {
  const user = await getCurrentUser();
  if (!user) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: user.id },
    select: { isAdmin: true },
  });

  return {
    ...user,
    isAdmin: customer?.isAdmin ?? false,
  };
}
