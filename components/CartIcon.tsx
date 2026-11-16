"use client";

import Link from "next/link";

const iconStyle = {
  width: 22,
  height: 22,
  stroke: "currentColor",
  strokeWidth: 1.8,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M6 7h12l-1 14H7L6 7z" />
      <path d="M9 7a3 3 0 016 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 12h11L21 7H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export default function HeaderIcons() {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Link href="/shop" aria-label="Shop" style={{ color: "var(--pink-text)" }}>
        <BagIcon />
      </Link>
      <Link href="/checkout" aria-label="Cart" style={{ color: "var(--pink-text)" }}>
        <CartIcon />
      </Link>
      <Link href="/account" aria-label="Account" style={{ color: "var(--pink-text)" }}>
        <UserIcon />
      </Link>
    </div>
  );
}
