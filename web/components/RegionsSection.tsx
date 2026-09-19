"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const REGIONS = [
  {
    name: "North West",
    tagline: "Headquarters",
    crops: "Organic Maize · Sunflower · Vegetables",
    water: "Hartbeespoort Dam — primary harvesting site",
    product: "Hya Power — all sizes",
    hectares: "400K ha cropland",
    accent: "#3D7A8F",
  },
  {
    name: "Free State",
    tagline: "Largest footprint",
    crops: "Organic Wheat · Maize · Sorghum",
    water: "Vaal River system — partnership harvesting",
    product: "Hya Power — 50kg, 100kg, 1 ton",
    hectares: "1.2M ha cropland",
    accent: "#6FA82A",
  },
  {
    name: "Western Cape",
    tagline: "Export-focused",
    crops: "Organic Vineyards · Citrus · Deciduous fruit",
    water: "Berg River — seasonal clearing",
    product: "Hya Power — 50kg, 100kg, 1 ton",
    hectares: "680K ha cropland",
    accent: "#6B4E9E",
  },
  {
    name: "KwaZulu-Natal",
    tagline: "Pasture territory",
    crops: "Organic Pasture · Sugarcane · Vegetables",
    water: "Midmar Dam — cooperative harvesting",
    product: "Hya Power — 50kg, 100kg, 1 ton",
    hectares: "920K ha cropland",
    accent: "#4E7A1F",
  },
  {
    name: "Gauteng",
    tagline: "Urban organic market",
    crops: "Organic Vegetables · Herbs · Microgreens",
    water: "Rietvlei & Bronkhorstspruit — clearing support",
    product: "Hya Power — 1kg to 1 ton",
    hectares: "340K ha cropland",
    accent: "#8D5B2A",
  },
  {
    name: "Mpumalanga",
    tagline: "Citrus & mixed",
    crops: "Organic Citrus · Maize · Soybean",
    water: "Olifants River — dam partnerships",
    product: "Hya Power — 50kg, 100kg, 1 ton",
    hectares: "780K ha cropland",
    accent: "#C9A24B",
  },
];

export default function RegionsSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="regions"
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60, maxWidth: 760 }}
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
            Where We Operate
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
            From{" "}
            <span style={{ color: "var(--water)" }}>waterways</span> to{" "}
            <span style={{ color: "var(--secondary)" }}>farmland</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            We harvest invasive hyacinth from dams and rivers across South
            Africa — then deliver Hya Power to organic farms in the same
            regions. Hover a province to see what grows there.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: 28,
                background: active === i ? "white" : "var(--bg-alt)",
                border: `1px solid ${
                  active === i ? r.accent : "var(--border)"
                }`,
                borderRadius: 16,
                cursor: "pointer",
                transition: "all 0.3s",
                transform: active === i ? "translateY(-6px)" : "none",
                boxShadow:
                  active === i
                    ? `0 12px 32px ${r.accent}22`
                    : "0 2px 8px rgba(31, 36, 32, 0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Colored top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: r.accent,
                  opacity: active === i ? 1 : 0.6,
                  transition: "opacity 0.3s",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  marginTop: 4,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "var(--text)",
                      letterSpacing: -0.5,
                      marginBottom: 4,
                    }}
                  >
                    {r.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 10,
                      color: r.accent,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      fontWeight: 800,
                    }}
                  >
                    {r.tagline}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-soft)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.hectares}
                </div>
              </div>

              <motion.div
                animate={{
                  height: active === i ? "auto" : 0,
                  opacity: active === i ? 1 : 0,
                }}
                initial={false}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    fontSize: 13,
                    color: "var(--text-muted)",
                    paddingTop: 8,
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 16, lineHeight: 1.2 }}>🌾</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--text-soft)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        Grown here
                      </div>
                      <div style={{ color: "var(--text)", fontWeight: 500 }}>
                        {r.crops}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 16, lineHeight: 1.2 }}>💧</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--text-soft)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        Waterways
                      </div>
                      <div
                        style={{
                          color: "var(--water)",
                          fontWeight: 500,
                        }}
                      >
                        {r.water}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 16, lineHeight: 1.2 }}>📦</span>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--text-soft)",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        Available
                      </div>
                      <div
                        style={{ color: "var(--text)", fontWeight: 500 }}
                      >
                        {r.product}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {active !== i && (
                <div
                  style={{
                    fontSize: 11,
                    color: r.accent,
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    marginTop: 4,
                  }}
                >
                  Hover for details →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 60,
            textAlign: "center",
            padding: "24px",
            background: "var(--surface-2)",
            borderRadius: 16,
            maxWidth: 800,
            margin: "60px auto 0",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            💧{" "}
            <strong style={{ color: "var(--text)" }}>
              Don&apos;t see your region?
            </strong>{" "}
            We deliver anywhere in South Africa. For municipal partnerships,
            dam clearing contracts, or distributor enquiries, call{" "}
            <strong style={{ color: "var(--primary-dark)" }}>
              081 147 5703
            </strong>
            .
          </div>
        </motion.div>
      </div>
    </section>
  );
}