"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--border-dark)",
        padding: "80px 32px 40px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top: 4 columns */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: 40,
            paddingBottom: 60,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 2,
                color: "var(--primary-light)",
                marginBottom: 12,
              }}
            >
              NOKO
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-soft)",
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              Artisan Bakery
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--text-muted)",
                maxWidth: 280,
              }}
            >
              Handmade breads, pastries, and curated boxes delivered fresh to
              Pretoria East. Made with care, baked with love.
            </p>

            {/* Seasonal indicator */}
            <div
              style={{
                marginTop: 20,
                padding: "10px 14px",
                background: "rgba(212, 168, 67, 0.1)",
                border: "1px solid rgba(212, 168, 67, 0.3)",
                borderRadius: 100,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: 0.5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                  animation: "pulse 2s infinite",
                }}
              />
              Now baking: Autumn Danishes
            </div>

            {/* Newsletter signup */}
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft)",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                Get 10% off your first order
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks! We'll be in touch with your discount.");
                }}
                style={{
                  display: "flex",
                  gap: 6,
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--text)",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    outline: "none",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 14px",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Join
                </button>
              </form>
            </div>

            {/* Instagram-style photo grid */}
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft)",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                Follow @noko.bakery
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 6,
                  maxWidth: 280,
                }}
              >
                {["🥖", "🥐", "🥨", "🥯", "🍞", "🧁"].map((emoji, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      background: `linear-gradient(135deg, ${
                        ["#B5388F", "#D4A843", "#8B5A2B"][i % 3]
                      }22 0%, var(--surface-2) 100%)`,
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Shop
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
              }}
            >
              <Link href="/shop" style={{ color: "var(--text-muted)" }}>
                All Products
              </Link>
              <Link href="/subscription" style={{ color: "var(--text-muted)" }}>
                Subscribe &amp; Save
              </Link>
              <Link href="/delivery" style={{ color: "var(--text-muted)" }}>
                Delivery Info
              </Link>
              <Link href="/account" style={{ color: "var(--text-muted)" }}>
                My Account
              </Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Info
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>
                R25 flat delivery fee
              </span>
              <span style={{ color: "var(--text-muted)" }}>15–20km radius</span>
              <span style={{ color: "var(--text-muted)" }}>
                Collection 8–10am
              </span>
              <span style={{ color: "var(--text-muted)" }}>
                Allergens: Gluten, Dairy, Egg
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              <span>Mooikloof Glen Country Estate</span>
              <span>Corner Garsfontein Rd &amp; Topaz Crescent</span>
              <span>Pretoria East</span>
              <a
                href="https://wa.me/27XXXXXXXXX"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--primary-light)",
                  fontWeight: 700,
                  marginTop: 8,
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 32,
            borderTop: "1px solid var(--border-dark)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12,
            color: "var(--text-soft)",
          }}
        >
          <span>
            © {new Date().getFullYear()} Noko Bakery. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Privacy Policy</span>
            <span>Terms of Sale</span>
            <span>POPIA Compliant</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
