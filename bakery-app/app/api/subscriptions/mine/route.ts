import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ subscription: null });
  }

  const subscription = await prisma.subscription.findFirst({
    where: { customerId: user.id, status: "ACTIVE" },
  });

  return NextResponse.json({ subscription });
}
