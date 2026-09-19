"use client";

import { motion } from "framer-motion";

const CREDENTIALS = [
  {
    label: "B-BBEE",
    value: "Level 3",
    detail: "Verified Contributor",
    icon: "🏅",
    color: "#E85A24",
  },
  {
    label: "Ownership",
    value: "100%",
    detail: "Black Owned & Managed",
    icon: "✊",
    color: "#1B4965",
  },
  {
    label: "CIDB",
    value: "221273",
    detail: "GB · CE · SH Category",
    icon: "📋",
    color: "#4E7A1F",
  },
  {
    label: "NHBRC",
    value: "1-37979997",
    detail: "Registered Home Builder",
    icon: "🏠",
    color: "#C9A24B",
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      style={{
        padding: "120px 40px",
        background: "var(--bg-alt)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: 60,
            maxWidth: 780,
            textAlign: "center",
            margin: "0 auto 60px",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--primary)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 800,
            }}
          >
            Credentials · Community · Purpose
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Registered. Compliant.{" "}
            <span style={{ color: "var(--primary)" }}>Committed.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            Jorud Solutions is a fully registered, fully compliant contractor —
            and a company that gives back to the communities it serves.
          </p>
        </motion.div>

        {/* Credentials grid */}
        <div
          className="credentials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 60,
          }}
        >
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                padding: 28,
                background: "white",
                border: "1px solid var(--border)",
                borderTop: `4px solid ${c.color}`,
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(26, 29, 32, 0.04)",
                transition: "box-shadow 0.2s",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 16,
                  filter: `drop-shadow(0 4px 12px ${c.color}33)`,
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: c.color,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "var(--text)",
                  letterSpacing: -0.8,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {c.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column: Mphakane story + Vision/Mission */}
        <div
          className="impact-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 24,
          }}
        >
          {/* Mphakane Education Trust */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "var(--charcoal-dark)",
              color: "white",
              borderRadius: 20,
              padding: 40,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Diagonal accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle at 100% 0%, rgba(232, 90, 36, 0.2) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                fontSize: 11,
                color: "var(--primary)",
                letterSpacing: 2.5,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 16,
                position: "relative",
              }}
            >
              Social Responsibility
            </div>

            <div
              style={{
                fontSize: 48,
                marginBottom: 20,
                position: "relative",
              }}
            >
              🎓
            </div>

            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 34px)",
                fontWeight: 900,
                letterSpacing: -1,
                lineHeight: 1.15,
                marginBottom: 20,
                position: "relative",
              }}
            >
              Co-funding{" "}
              <span style={{ color: "var(--primary)" }}>
                10 students&apos; education
              </span>
            </h3>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: 24,
                position: "relative",
              }}
            >
              Through the{" "}
              <strong style={{ color: "white", fontWeight: 800 }}>
                Mphakane Educational Trust Fund
              </strong>
              , Jorud Solutions co-funds tertiary education for 10 students from
              Mphakane Village — empowering intellectually gifted young people
              to pursue their career ambitions and grow our future economy.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                background: "rgba(232, 90, 36, 0.15)",
                border: "1px solid rgba(232, 90, 36, 0.4)",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 800,
                color: "var(--primary)",
                letterSpacing: 1,
                textTransform: "uppercase",
                position: "relative",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  boxShadow: "0 0 0 3px rgba(232, 90, 36, 0.3)",
                }}
              />
              Active Initiative · Since 2023
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderLeft: "4px solid var(--primary)",
                borderRadius: 16,
                padding: 32,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--primary)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                Our Vision
              </div>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.5,
                  letterSpacing: -0.3,
                }}
              >
                To be the preferred service provider within our defined
                markets.
              </p>
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid var(--border)",
                borderLeft: "4px solid var(--secondary)",
                borderRadius: 16,
                padding: 32,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--secondary)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                Our Mission
              </div>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.5,
                  letterSpacing: -0.3,
                }}
              >
                An unwavering commitment to streamlined, unsurpassed quality
                service to our clients.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 60,
            padding: "32px 40px",
            background: "var(--primary)",
            color: "white",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 40 }}>🛡️</div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                opacity: 0.85,
                marginBottom: 6,
              }}
            >
              Guarantee Period
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: -0.3,
                lineHeight: 1.4,
              }}
            >
              We guarantee our workmanship and provide warranty on all products
              as per manufacturer requirements and conditions.
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1000px) {
          .credentials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .impact-split {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .credentials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}