"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "16px 5vw" : "24px 5vw",
        background: scrolled ? "#FFFFFF" : "transparent", // Clean White
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #E5E5E5" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}
    >
      <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", letterSpacing: -1 }}>
        NOKO
      </Link>

      <div style={{ display: "flex", gap: 32, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>
        <Link href="/shop" style={{ color: "var(--text)" }}>Shop</Link>
        <Link href="/subscription" style={{ color: "var(--text)" }}>Subscribe</Link>
        <Link href="/delivery" style={{ color: "var(--text)" }}>Delivery</Link>
        <Link href="/account" style={{ color: "var(--text)" }}>Account</Link>
      </div>
    </nav>
  );
}
