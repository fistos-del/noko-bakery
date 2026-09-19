"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ImpactStat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: string;
  description: string;
  color: string;
}

const STATS: ImpactStat[] = [
  {
    label: "Hyacinth Removed",
    value: 127450,
    suffix: " kg",
    icon: "🌿",
    description: "Invasive weed cleared from South African waterways",
    color: "#3D7A8F",
  },
  {
    label: "Dams Cleared",
    value: 12,
    suffix: "",
    icon: "💧",
    description: "Hartbeespoort and beyond — restored to natural flow",
    color: "#4E7A1F",
  },
  {
    label: "Organic Fertilizer",
    value: 54300,
    suffix: " kg",
    icon: "🌱",
    description: "Hya Power bags produced from harvested hyacinth",
    color: "#6FA82A",
  },
  {
    label: "Farms Supported",
    value: 340,
    suffix: "+",
    icon: "🌾",
    description: "Commercial and smallholder farms across South Africa",
    color: "#8D5B2A",
  },
];

interface Certification {
  name: string;
  issuer: string;
  description: string;
  color: string;
  icon: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "ECOCERT SA",
    issuer: "Organic Certification Inspection",
    description:
      "Inspected for use in certified organic agriculture. Suitable for organic produce sold in South Africa and the EU.",
    color: "#6FA82A",
    icon: "✅",
  },
  {
    name: "Mintirho Foundation",
    issuer: "Coca-Cola Beverages SA",
    description:
      "R25 million investment partner supporting our harvester machines and production scale-up.",
    color: "#C0392B",
    icon: "🤝",
  },
  {
    name: "Circular Economy",
    issuer: "Environmental Mission",
    description:
      "Every kilogram of Hya Power represents a kilogram of invasive weed removed from our rivers and dams.",
    color: "#3D7A8F",
    icon: "♻️",
  },
  {
    name: "100% Organic",
    issuer: "Product Guarantee",
    description:
      "No synthetic chemicals. No additives. Just mineralised water hyacinth — nature's most persistent weed turned into nature's best fertilizer.",
    color: "#8D5B2A",
    icon: "🌿",
  },
];

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    let frameId: number;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start]);

  return count;
}

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="impact"
      ref={sectionRef}
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 70, maxWidth: 780, textAlign: "center", margin: "0 auto 70px" }}
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
            Environmental Impact
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
            Real numbers.{" "}
            <span style={{ color: "var(--secondary)" }}>Real impact.</span>
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
            Every bag of Hya Power starts as a kilogram of water hyacinth
            pulled from a South African dam. Here's what that adds up to.
          </p>
        </motion.div>

        {/* Impact stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginBottom: 80,
          }}
        >
          {STATS.map((stat, i) => (
            <ImpactCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--primary-dark)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            Credentials & Partners
          </div>
          <h3
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              letterSpacing: -1,
              color: "var(--text)",
            }}
          >
            Trusted by certifiers and partners
          </h3>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: 28,
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: cert.color,
                }}
              />
              <div style={{ fontSize: 40, marginBottom: 16 }}>{cert.icon}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: cert.color,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {cert.issuer}
              </div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 12,
                  color: "var(--text)",
                  letterSpacing: -0.3,
                }}
              >
                {cert.name}
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCard({
  stat,
  index,
  inView,
}: {
  stat: ImpactStat;
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, 2200, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{
        padding: 28,
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 16,
        textAlign: "center",
        boxShadow: "0 2px 12px rgba(31, 36, 32, 0.04)",
      }}
    >
      <div
        style={{
          fontSize: 36,
          marginBottom: 16,
          filter: `drop-shadow(0 4px 12px ${stat.color}44)`,
        }}
      >
        {stat.icon}
      </div>
      <div
        style={{
          fontSize: "clamp(32px, 4vw, 44px)",
          fontWeight: 800,
          color: stat.color,
          letterSpacing: -1.5,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {stat.label}
      </div>
      <p
        style={{
          fontSize: 12.5,
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  );
}