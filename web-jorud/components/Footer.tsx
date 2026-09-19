"use client";

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--primary)",
        color: "white",
        padding: "80px 40px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Charcoal diagonal accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "35%",
          background: "var(--charcoal-dark)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          pointerEvents: "none",
          opacity: 0.15,
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Top section */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr",
            gap: 40,
            paddingBottom: 60,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: -0.5,
                marginBottom: 4,
              }}
            >
              JORUD
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
                marginBottom: 20,
              }}
            >
              Solutions cc
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 300,
              }}
            >
              Building South Africa since 1999. 100% black-owned. CIDB &amp;
              NHBRC registered. Level 3 B-BBEE contributor.
            </p>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Services
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <span>Civil &amp; General Building</span>
              <span>Horticulture</span>
              <span>Steel Engineering</span>
              <span>Logistics &amp; Transport</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Company
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <span>About Us</span>
              <span>Management Profile</span>
              <span>Recent Work</span>
              <span>Social Responsibility</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
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
                gap: 12,
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>
                  Matome Malatjie
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                  13 Huilboom Street, Moreleta Park
                  <br />
                  Pretoria, Gauteng 0140
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                082 781 5071
                <br />
                086 579 5371
              </div>
              <div style={{ fontSize: 13 }}>
                info@jorudsolution.co.za
              </div>
            </div>
          </div>
        </div>

        {/* Registration strip */}
        <div
          style={{
            paddingTop: 30,
            paddingBottom: 30,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            fontSize: 11,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 1,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span>CIDB 221273</span>
          <span>NHBRC 1-37979997</span>
          <span>B-BBEE Level 3</span>
          <span>100% Black Owned</span>
          <span>Est. 1999</span>
        </div>

        {/* Bottom */}
        <div
          className="footer-bottom"
          style={{
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "rgba(255,255,255,0.75)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span>
            © {new Date().getFullYear()} Jorud Solutions cc. All rights
            reserved.
          </span>
          <a
            href="#top"
            style={{
              color: "white",
              fontWeight: 700,
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .site-footer {
            padding: 60px 20px 30px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}