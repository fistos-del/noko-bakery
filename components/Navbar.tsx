"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderIcons from "./CartIcon"; // Assuming this exists from before

const MENU = [
  { href: "/about", label: "About Us" },
  { href: "/shop", label: "Shop" },
  { href: "/subscription", label: "Subscribe" },
  { href: "/delivery", label: "Delivery" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "16px 5vw",
          background: "var(--brand-muted)", // #D5B1B8 Header Bar
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: "var(--brand-muted)", padding: 0,
              display: "flex", flexDirection: "column", gap: 5,
            }}
          >
            <span style={{ width: 24, height: 2, background: "currentColor", borderRadius: 2 }} />
            <span style={{ width: 24, height: 2, background: "currentColor", borderRadius: 2 }} />
            <span style={{ width: 24, height: 2, background: "currentColor", borderRadius: 2 }} />
          </button>

          {/* Logo Text */}
          <Link
            href="/"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 28,
              color: "var(--brand-plum)",
              lineHeight: 1,
              textDecoration: "none",
              paddingBottom: 4
            }}
          >
            Noko
          </Link>
        </div>

        {/* Right: 3 icons (assuming CartIcon accepts currentColor) */}
        <div style={{ color: "var(--brand-muted)" }}>
          <HeaderIcons />
        </div>
      </nav>

      {/* Dropdown overlay */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 98, background: "rgba(0,0,0,0.2)" }}
          />
          <div
            style={{
              position: "fixed", top: 64, left: "5vw", zIndex: 99,
              background: "var(--brand-plum)", // Dark plum dropdown
              borderRadius: 12,
              padding: "24px 32px",
              minWidth: 220,
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "var(--brand-muted)", // Muted rose text on dark plum
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(213,177,184,0.2)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
