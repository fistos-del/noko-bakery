"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
        <footer
      className="site-footer"
      style={{
        background: "var(--forest)",
        color: "rgba(255, 255, 255, 0.9)",
        padding: "80px 40px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 16,
              color: "white",
              letterSpacing: -0.8,
            }}
          >
            Let&apos;s grow together
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 16,
              marginBottom: 32,
              maxWidth: 500,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Bulk orders, distribution partnerships, and water hyacinth
            harvesting collaborations welcome. We respond within 24 hours.
          </p>
          <a
            href="tel:+27811475703"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              background: "var(--primary)",
              color: "white",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 4px 20px rgba(111, 168, 42, 0.25)",
            }}
          >
            Call: 081 147 5703
          </a>
        </motion.div>

        <div
          className="footer-links-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 40,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Product
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span>Hya Power Fertilizer</span>
              <span>Organic Certification</span>
              <span>Application Guide</span>
              <span>Bulk Pricing</span>
            </div>
          </div>
          <div>
            <div
              style={{
                color: "var(--text)",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Company
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span>Our Story</span>
              <span>Harvesting Process</span>
              <span>Partnerships</span>
              <span>Contact</span>
            </div>
          </div>
          <div>
            <div
              style={{
                color: "var(--text)",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Impact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span>Water Hyacinth Removal</span>
              <span>Circular Economy</span>
              <span>Organic Agriculture</span>
              <span>Environmental Reports</span>
            </div>
          </div>
          <div>
            <div
              style={{
                color: "var(--text)",
                fontWeight: 700,
                marginBottom: 12,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span>081 147 5703</span>
              <span>081 394 3120</span>
              <span>Hartbeespoort Dam, NW</span>
              <span>South Africa</span>
            </div>
          </div>
        </div>

        <div
          className="footer-bottom-row"
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>
            © 2025 Hyamatla Organics (Pty) Ltd. All rights reserved.
          </span>
          <span>Inspected by ECOCERT SA</span>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .site-footer {
            padding: 60px 20px 30px !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 500px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}