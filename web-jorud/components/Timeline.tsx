"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tag: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1999",
    title: "Founded in Transport",
    description:
      "Jorud Solutions cc is founded with a primary focus on transport and logistics — moving goods across South Africa for industrial clients.",
    icon: "🚛",
    color: "#C9A24B",
    tag: "Foundation",
  },
  {
    year: "2005",
    title: "Diversification Begins",
    description:
      "Operations team capabilities expand. Jorud adds general building and civil works to its offering — a natural extension of the logistics footprint.",
    icon: "🏗️",
    color: "#E85A24",
    tag: "Growth",
  },
  {
    year: "2010",
    title: "Horticulture Division",
    description:
      "Municipal horticulture contracts begin — grass cutting, tree felling, and grounds maintenance for metros and water utilities across Gauteng.",
    icon: "🌿",
    color: "#4E7A1F",
    tag: "Expansion",
  },
  {
    year: "2015",
    title: "CIDB & NHBRC Registered",
    description:
      "Formal registration with CIDB (221273 GB, CE, SH) and NHBRC (1-37979997) — unlocking public sector contracts and formal tender eligibility.",
    icon: "📋",
    color: "#1B4965",
    tag: "Credentials",
  },
  {
    year: "2018",
    title: "800 RDP House Rectification",
    description:
      "Awarded the Servcon / Dept of Housing contract to rectify poor workmanship on 800 RDP houses. Full scope: plastering, plumbing, painting, sewer reticulation.",
    icon: "🏘️",
    color: "#E85A24",
    tag: "Landmark",
  },
  {
    year: "2021",
    title: "CSIR & Industrial Contracts",
    description:
      "Renovation and partitioning work for CSIR (R800K) and other national research institutes. Steel engineering division formalized.",
    icon: "⚙️",
    color: "#1B4965",
    tag: "Corporate",
  },
  {
    year: "2023",
    title: "Mphakane Education Trust",
    description:
      "Jorud co-funds tertiary education for 10 students from Mphakane Village through the Mphakane Educational Trust Fund — giving back to the communities we work in.",
    icon: "🎓",
    color: "#4E7A1F",
    tag: "Impact",
  },
  {
    year: "Today",
    title: "Multi-Disciplinary Contractor",
    description:
      "Four core service lines. 100% black-owned. Level 3 B-BBEE. Public sector and corporate clients across all nine provinces. Ready for the next 25 years.",
    icon: "🚀",
    color: "#E85A24",
    tag: "Present",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="timeline"
      ref={containerRef}
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: 80,
            maxWidth: 780,
            textAlign: "center",
            margin: "0 auto 80px",
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
            Our Story
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
            25 years.{" "}
            <span style={{ color: "var(--primary)" }}>
              Building, growing, delivering.
            </span>
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
            From a transport startup to a multi-disciplinary contractor — here&apos;s
            how Jorud Solutions grew.
          </p>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div
            className="timeline-line"
            style={{
              position: "absolute",
              left: 32,
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--border)",
            }}
          />

          <motion.div
            className="timeline-line"
            style={{
              position: "absolute",
              left: 32,
              top: 0,
              width: 2,
              height: progressHeight,
              background:
                "linear-gradient(180deg, #E85A24 0%, #1B4965 50%, #4E7A1F 100%)",
              boxShadow: "0 0 12px rgba(232, 90, 36, 0.5)",
            }}
          />

          {MILESTONES.map((m, i) => (
            <MilestoneRow key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 700px) {
          .timeline-line {
            left: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

function MilestoneRow({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.4], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x,
        display: "grid",
        gridTemplateColumns: "65px 1fr",
        alignItems: "flex-start",
        gap: 24,
        marginBottom: 40,
        position: "relative",
      }}
      className="timeline-row"
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: 6,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.2 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "white",
            border: `3px solid ${milestone.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: `0 0 0 6px var(--bg), 0 0 20px ${milestone.color}33`,
            marginLeft: 8,
          }}
        >
          {milestone.icon}
        </motion.div>
      </div>

      <div
        style={{
          padding: 26,
          background: "white",
          border: "1px solid var(--border)",
          borderLeft: `4px solid ${milestone.color}`,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(26, 29, 32, 0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: milestone.color,
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            {milestone.year}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: milestone.color,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              padding: "4px 12px",
              background: `${milestone.color}15`,
              border: `1px solid ${milestone.color}33`,
              borderRadius: 100,
            }}
          >
            {milestone.tag}
          </div>
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: -0.4,
            color: "var(--text)",
            marginBottom: 10,
            lineHeight: 1.25,
          }}
        >
          {milestone.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}