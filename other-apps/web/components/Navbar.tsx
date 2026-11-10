"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const LINKS = [
  { href: "#products", label: "Product" },
  { href: "#showcase", label: "3D Viewer" },
  { href: "#journey", label: "Process" },
  { href: "#nutrients", label: "Nutrients" },
  { href: "#impact", label: "Impact" },
  { href: "#quote", label: "Bulk Quote" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="nav-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 40px" : "18px 40px",
          background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          onClick={handleLinkClick}
        >
          <AnimatedLogo />
        </Link>

        <div
          className="nav-links only-desktop"
          style={{
            display: "flex",
            gap: 28,
            fontSize: 14,
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                transition: "color 0.2s",
                color: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#quote"
          className="only-desktop"
          style={{
            padding: "10px 22px",
            background: "var(--primary)",
            color: "white",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--primary-dark)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--primary)")
          }
        >
          Request Quote
        </a>

        <button
          onClick={() => setMenuOpen(true)}
          className="only-mobile"
          aria-label="Open menu"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
            display: "none",
          }}
        >
          <div
            style={{
              width: 22,
              height: 2,
              background: "var(--text)",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "var(--text)",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "var(--text)",
              borderRadius: 2,
            }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              padding: "24px 32px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 60,
              }}
            >
              <AnimatedLogo />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  color: "var(--text)",
                  fontSize: 20,
                  lineHeight: 1,
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                flex: 1,
              }}
            >
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--text)",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                    letterSpacing: -0.5,
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <a
              href="#quote"
              onClick={handleLinkClick}
              style={{
                padding: "18px",
                background: "var(--primary)",
                color: "white",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                textAlign: "center",
                marginTop: 24,
              }}
            >
              Request Bulk Quote →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          .nav-root {
            padding: 14px 20px !important;
          }
          .nav-links {
            display: none !important;
          }
          .only-desktop {
            display: none !important;
          }
          .only-mobile {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}