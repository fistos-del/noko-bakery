"use client";

import { motion } from "framer-motion";

const MACRO_NUTRIENTS = [
  { symbol: "N", name: "Nitrogen", value: "5.27%", detail: "52.7 g/kg" },
  { symbol: "P", name: "Phosphorus", value: "0.13%", detail: "1.3 g/kg" },
  { symbol: "K", name: "Potassium", value: "0.40%", detail: "4.0 g/kg" },
  { symbol: "Ca", name: "Calcium", value: "0.54%", detail: "" },
  { symbol: "Mg", name: "Magnesium", value: "0.48%", detail: "" },
  { symbol: "S", name: "Sulphur", value: "0.38%", detail: "" },
];

const MICRO_NUTRIENTS = [
  { symbol: "Fe", name: "Iron", value: "8,487.50", unit: "mg/kg" },
  { symbol: "Mn", name: "Manganese", value: "1,979.65", unit: "mg/kg" },
  { symbol: "B", name: "Boron", value: "399.86", unit: "mg/kg" },
  { symbol: "Na", name: "Sodium", value: "755.27", unit: "mg/kg" },
  { symbol: "Cr", name: "Chromium", value: "79.91", unit: "mg/kg" },
  { symbol: "Zn", name: "Zinc", value: "77.08", unit: "mg/kg" },
  { symbol: "Cu", name: "Copper", value: "36.74", unit: "mg/kg" },
  { symbol: "Co", name: "Cobalt", value: "16.83", unit: "mg/kg" },
  { symbol: "Mo", name: "Molybdenum", value: "0.76", unit: "mg/kg" },
];

const COMPARISON = [
  {
    label: "Soil Bonding",
    hyaPower: "Organically, chemically bonded to soil",
    mineral: "Synthetic / fossil-based, soluble in water",
  },
  {
    label: "Leaching",
    hyaPower: "Insoluble — does not leach, replenishes soils",
    mineral: "Leaches into water courses; depletes soil nutrients",
  },
  {
    label: "Filler Content",
    hyaPower: "100% organic matter, zero filler",
    mineral: "78% of matter is filler — not useful to plants",
  },
  {
    label: "Micronutrients",
    hyaPower: "All micronutrients released back to soil",
    mineral: "Lacks micronutrients — special additives required",
  },
  {
    label: "Release Rate",
    hyaPower: "Slow release, feeds throughout the season",
    mineral: "60% of useful nutrients leach out of the soil",
  },
  {
    label: "pH Balance",
    hyaPower: "No toxicity, no pH proliferation in soils",
    mineral: "Long-term use changes soil pH; needs chemicals to correct",
  },
  {
    label: "Soil Health",
    hyaPower: "Sustains and replenishes soil nutrients",
    mineral: "Does nothing to replenish soil",
  },
  {
    label: "Cost & Supply",
    hyaPower: "Cheap local natural raw material",
    mineral: "High cost; imported raw materials, energy-intensive",
  },
  {
    label: "Weed Control",
    hyaPower: "Product free of any type of weeds",
    mineral: "Chemical spraying required to prevent plant pests",
  },
];

const CERTIFICATIONS = [
  {
    name: "FERTASA",
    detail: "Endorsed by Fertilizer Association of South Africa",
    icon: "🏛️",
  },
  {
    name: "Intertek Lab",
    detail: "Every batch tested by accredited Intertek Agricultural Services",
    icon: "🔬",
  },
  {
    name: "DAFF Organic",
    detail: "Certified Organic Fertilizer by the Department of Agriculture",
    icon: "✅",
  },
  {
    name: "Cert. #B5581",
    detail: "Group 2 registration under Act 36 of 1947",
    icon: "📜",
  },
];

export default function NutrientsSection() {
  return (
    <section
      id="nutrients"
      style={{
        padding: "120px 40px",
        background: "var(--bg-alt)",
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
              color: "var(--primary-dark)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Nutrients · Certifications · Proof
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            16 nutrients.{" "}
            <span style={{ color: "var(--secondary)" }}>Zero chemicals.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            Every batch of Hya Power is tested by accredited laboratories and
            endorsed by FERTASA. Here&apos;s exactly what&apos;s in the bag —
            and how it compares to mineral fertilizers.
          </p>
        </motion.div>

        {/* Macro nutrients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: 32,
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: -0.3,
              }}
            >
              🌱 Macro Nutrients
            </h3>
            <div
              style={{
                fontSize: 11,
                color: "var(--primary-dark)",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Cert. #B5581
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
            }}
          >
            {MACRO_NUTRIENTS.map((n) => (
              <div
                key={n.symbol}
                style={{
                  padding: 16,
                  background: "var(--bg-alt)",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--primary-dark)",
                      letterSpacing: -0.5,
                    }}
                  >
                    {n.symbol}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {n.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "var(--text)",
                    letterSpacing: -0.3,
                  }}
                >
                  {n.value}
                </div>
                {n.detail && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-soft)",
                      marginTop: 2,
                    }}
                  >
                    {n.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Micro nutrients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: 32,
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 16,
            marginBottom: 60,
          }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: -0.3,
              marginBottom: 24,
            }}
          >
            🔬 Micro &amp; Trace Nutrients
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {MICRO_NUTRIENTS.map((n) => (
              <div
                key={n.symbol}
                style={{
                  padding: 14,
                  background: "var(--bg-alt)",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "var(--primary-dark)",
                    }}
                  >
                    {n.symbol}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {n.name}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    {n.value}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: "var(--text-soft)",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {n.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* pH + EC row */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                pH
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "var(--primary-dark)",
                }}
              >
                7.69
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                Electrical Conductivity
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "var(--primary-dark)",
                }}
              >
                1,570 µs/cm
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h3
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: -1,
                color: "var(--text)",
                marginBottom: 12,
              }}
            >
              Hya Power vs. Mineral Fertilizer
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 15,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              A side-by-side comparison. The difference is what stays in your
              soil.
            </p>
          </div>

          <div
            className="comparison-table"
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 2fr 2fr",
                background: "var(--forest)",
                color: "white",
              }}
            >
              <div
                style={{
                  padding: "18px 20px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Aspect
              </div>
              <div
                style={{
                  padding: "18px 20px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "#8CC63F",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                🌿 Hya Power Organic
              </div>
              <div
                style={{
                  padding: "18px 20px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "#C07F3E",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                ⚗️ Mineral Fertilizer
              </div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className="comparison-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 2fr 2fr",
                  background: i % 2 === 0 ? "white" : "var(--bg-alt)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--text-soft)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    fontSize: 13,
                    color: "var(--text)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    borderLeft: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--primary-dark)",
                      marginRight: 6,
                      fontWeight: 800,
                    }}
                  >
                    ✓
                  </span>
                  {row.hyaPower}
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    borderLeft: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--danger)",
                      marginRight: 6,
                      fontWeight: 800,
                    }}
                  >
                    ✕
                  </span>
                  {row.mineral}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h3
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: -1,
                color: "var(--text)",
                marginBottom: 12,
              }}
            >
              Tested. Endorsed. Certified.
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  padding: 24,
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>
                  {cert.icon}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "var(--text)",
                    marginBottom: 8,
                    letterSpacing: -0.3,
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {cert.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community impact note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 60,
            padding: 32,
            background: "var(--forest)",
            borderRadius: 16,
            color: "white",
            textAlign: "center",
            maxWidth: 900,
            margin: "60px auto 0",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌍</div>
          <div
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 800,
              letterSpacing: -0.5,
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            Solving an environmental problem for 258 communities
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            Water hyacinth is the world&apos;s worst weed — smothering dams,
            blocking waterways, and depleting oxygen for fish. Every kilogram we
            harvest supports the 258 communities living around affected dams and
            the government departments responsible for them.
          </p>
        </motion.div>
      </div>

      {/* Mobile responsive */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .comparison-table {
            overflow-x: auto;
          }
          .comparison-table > div {
            min-width: 640px;
          }
        }
      `}</style>
    </section>
  );
}