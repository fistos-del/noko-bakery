"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Stage {
  id: string;
  icon: string;
  title: string;
  text: string;
  color: string;
  detail: string;
}

const STAGES: Stage[] = [
  {
    id: "harvest",
    icon: "🚤",
    title: "Harvesting",
    text: "Our teams remove invasive water hyacinth from Hartbeespoort Dam and other South African waterways — clearing dams of the world's worst weed.",
    color: "#3D7A8F",
    detail: "Hartbeespoort Dam · Custom harvester machines · R25M Mintirho investment",
  },
  {
    id: "transport",
    icon: "🚚",
    title: "Transport",
    text: "Freshly harvested hyacinth is transported to our processing facility, where it begins its transformation from problem to product.",
    color: "#8D5B2A",
    detail: "Local logistics · Zero-waste chain · Rapid processing",
  },
  {
    id: "mineralise",
    icon: "🔥",
    title: "Mineralising",
    text: "Organic matter is broken down through our mineralisation process — converting the weed into bioavailable plant nutrients.",
    color: "#C9A24B",
    detail: "Proprietary process · Slow breakdown · Nutrient-dense output",
  },
  {
    id: "blend",
    icon: "🌿",
    title: "Blending",
    text: "The mineralised matter is blended into Hya Power — a balanced organic fertilizer containing up to 16 essential plant nutrients.",
    color: "#6FA82A",
    detail: "16 nutrients · Macro + micro elements · Balanced formula",
  },
  {
    id: "bond",
    icon: "💧",
    title: "Soil Bonding",
    text: "Unlike synthetic fertilizer, Hya Power chemically bonds to soil and does not dissolve in water — no leaching, no waste, no runoff into rivers.",
    color: "#4E7A1F",
    detail: "Insoluble in water · Restores pH · Improves retention",
  },
  {
    id: "harvest2",
    icon: "🌾",
    title: "Bountiful Harvest",
    text: "Farmers apply once per season and see higher yields, healthier soil, and 100% organic produce — closing the circular economy loop.",
    color: "#6B4E9E",
    detail: "Higher yields · Single application · ECOCERT inspected",
  },
];

export default function NutrientJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      style={{
        position: "relative",
        background: "var(--bg-alt)",
      }}
    >
      {/* Sticky header */}
      <div
        className="journey-sticky-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          padding: "120px 40px 40px",
          background:
            "linear-gradient(180deg, var(--bg-alt) 0%, var(--bg-alt) 70%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
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
            From Weed to Feed
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              marginBottom: 20,
              color: "var(--text)",
            }}
          >
            Watch the{" "}
            <span style={{ color: "var(--secondary)" }}>
              water hyacinth
            </span>{" "}
            become soil
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              marginBottom: 24,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "0 auto 24px",
            }}
          >
            Every bag of Hya Power begins as an environmental problem. Scroll
            to follow its journey from dam to farm.
          </p>

          {/* Progress bar */}
          <div
            style={{
              height: 4,
              background: "var(--surface-2)",
              borderRadius: 100,
              overflow: "hidden",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                width: progressWidth,
                background:
                  "linear-gradient(90deg, #3D7A8F, #6FA82A, #8D5B2A, #6B4E9E)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable journey */}
      <div
        className="journey-body"
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 40px 120px",
        }}
      >
        {/* Central vertical line */}
        <div
          className="journey-line"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            background: "var(--border)",
            transform: "translateX(-50%)",
          }}
        />

        <div style={{ position: "relative" }}>
          {STAGES.map((stage, i) => (
            <StageRow key={stage.id} stage={stage} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .journey-sticky-header {
            padding: 100px 20px 30px !important;
          }
          .journey-body {
            padding: 40px 20px 80px !important;
          }
          .journey-line {
            left: 32px !important;
          }
          .journey-row {
            grid-template-columns: 64px 1fr !important;
            margin-bottom: 40px !important;
            min-height: auto !important;
          }
          .journey-empty-cell {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function StageRow({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.96, 1, 1, 0.96]
  );
  const x = useTransform(scrollYProgress, [0, 0.3], [isLeft ? -40 : 40, 0]);

  return (
    <motion.div
      ref={ref}
      className="journey-row"
      style={{
        opacity,
        scale,
        x,
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        alignItems: "center",
        marginBottom: 80,
        minHeight: 200,
      }}
    >
      <div
        className="journey-card-cell"
        style={{
          display: "flex",
          justifyContent: isLeft ? "flex-end" : "flex-start",
          gridColumn: isLeft ? "1" : "3",
          paddingRight: isLeft ? 20 : 0,
          paddingLeft: isLeft ? 0 : 20,
        }}
      >
        <StageCard stage={stage} align={isLeft ? "right" : "left"} />
      </div>

      <div
        className="journey-marker-cell"
        style={{
          gridColumn: "2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 6,
        }}
      >
        <motion.div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "white",
            border: `3px solid ${stage.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            boxShadow: `0 0 30px ${stage.color}33, 0 4px 12px rgba(31, 36, 32, 0.08)`,
          }}
        >
          {stage.icon}
        </motion.div>
      </div>

      <div
        className="journey-empty-cell"
        style={{
          gridColumn: isLeft ? "3" : "1",
          gridRow: "1",
        }}
      />
    </motion.div>
  );
}

function StageCard({
  stage,
  align,
}: {
  stage: Stage;
  align: "left" | "right";
}) {
  return (
    <div
      className="journey-card"
      style={{
        maxWidth: 420,
        padding: 26,
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 14,
        textAlign: align,
        boxShadow: "0 2px 12px rgba(31, 36, 32, 0.04)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: stage.color,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 8,
          fontWeight: 800,
        }}
      >
        Stage {String(stage.id).toUpperCase()}
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 12,
          color: "var(--text)",
          letterSpacing: -0.4,
        }}
      >
        {stage.title}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--text-muted)",
          lineHeight: 1.65,
          marginBottom: 16,
        }}
      >
        {stage.text}
      </p>
      <div
        style={{
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
          fontSize: 11,
          color: stage.color,
          letterSpacing: 0.3,
          fontWeight: 700,
        }}
      >
        {stage.detail}
      </div>
    </div>
  );
}