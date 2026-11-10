"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Bag3D from "./Bag3D";

const VARIANTS = [
  {
    id: "1kg",
    name: "1 kg",
    weight: "1 kg",
    use: "Home gardens, pots, seedlings",
    accent: "#8CC63F",
  },
  {
    id: "10kg",
    name: "10 kg",
    weight: "10 kg",
    use: "Homesteads, food gardens",
    accent: "#6FA82A",
  },
  {
    id: "50kg",
    name: "50 kg",
    weight: "50 kg",
    use: "Commercial farms",
    accent: "#C07F3E",
  },
  {
    id: "1ton",
    name: "1 Ton",
    weight: "1 ton",
    use: "Distributors & co-ops",
    accent: "#2E4A2E",
  },
];

export default function BagShowcase() {
  const [active, setActive] = useState(2);
  const variant = VARIANTS[active];

  return (
    <section
      id="showcase"
      style={{
        padding: "120px 40px",
        background: "var(--bg-alt)",
      }}
    >
      <div
        className="bag-showcase-grid"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Bag3D weight={variant.weight} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
            Interactive Product Viewer
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              marginBottom: 24,
              color: "var(--text)",
            }}
          >
            Meet{" "}
            <span style={{ color: "var(--secondary)" }}>Hya Power</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 520,
            }}
          >
            The real Hya Power packaging — printed with the same story you see
            here. Drag to inspect the bag from every angle, then choose the size
            that fits your operation.
          </p>

          <div
            className="bag-variant-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              maxWidth: 520,
              marginBottom: 32,
            }}
          >
            {VARIANTS.map((v, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={v.id}
                  onClick={() => setActive(i)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "14px 16px",
                    background: isActive ? "white" : "transparent",
                    border: `1px solid ${
                      isActive ? v.accent : "var(--border)"
                    }`,
                    borderRadius: 10,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    color: "var(--text)",
                    boxShadow: isActive
                      ? `0 4px 16px ${v.accent}22`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: v.accent,
                        boxShadow: isActive
                          ? `0 0 8px ${v.accent}`
                          : "none",
                      }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 800 }}>
                      {v.name}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {v.use}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div
            className="bag-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              paddingTop: 24,
              borderTop: "1px solid var(--border)",
              maxWidth: 520,
            }}
          >
            <Stat label="Application" value="1× / season" />
            <Stat label="Nutrients" value="16 essential" />
            <Stat label="Certification" value="ECOCERT" />
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .bag-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .bag-variant-grid {
            max-width: 100% !important;
          }
          .bag-stats-grid {
            max-width: 100% !important;
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .bag-variant-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: "var(--text-soft)",
          textTransform: "uppercase",
          letterSpacing: 1.2,
          marginBottom: 4,
          fontWeight: 800,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: "var(--text)",
        }}
      >
        {value}
      </div>
    </div>
  );
}