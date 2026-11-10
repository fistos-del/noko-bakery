"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Service {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  capabilities: string[];
  reference: string;
}

const SERVICES: Service[] = [
  {
    id: "civil",
    number: "01",
    name: "Civil & General Building",
    shortName: "Civil",
    tagline: "Roads, water, structures, homes",
    description:
      "Full civil works capability — from site clearing and earthworks to water reticulation, stormwater systems, paving, and residential construction. We've rectified over 800 RDP houses and built municipal infrastructure across Gauteng.",
    icon: "🏗️",
    color: "#E85A24",
    capabilities: [
      "Water reticulation & pipework",
      "Civil structures (bridges, culverts)",
      "Roads, paving, stormwater",
      "Residential & commercial building",
    ],
    reference: "800+ RDP houses rectified · Dept of Public Works access roads",
  },
  {
    id: "horticulture",
    number: "02",
    name: "Horticulture & Grounds Maintenance",
    shortName: "Horticulture",
    tagline: "Green spaces, kept green",
    description:
      "Parks, reservoirs, water treatment plants, and public open spaces kept clean and maintained. Tree felling, grass cutting, landscaping, and ongoing municipal maintenance contracts.",
    icon: "🌿",
    color: "#4E7A1F",
    capabilities: [
      "Grass cutting & land clearing",
      "Tree felling & vegetation control",
      "Landscaping & grounds maintenance",
      "Reservoir & treatment plant upkeep",
    ],
    reference: "Ekurhuleni Metro Parks · Johannesburg Water",
  },
  {
    id: "steel",
    number: "03",
    name: "Steel Engineering & Fabrication",
    shortName: "Steel",
    tagline: "Structural steel, done right",
    description:
      "Design, fabrication, and installation of structural steel for schools, factories, and industrial clients. Partitioning, mezzanines, kitchen installations, and specialty steel work.",
    icon: "⚙️",
    color: "#1B4965",
    capabilities: [
      "Structural steel fabrication",
      "School & factory installations",
      "Partitioning & mezzanine floors",
      "Industrial kitchen & equipment erection",
    ],
    reference: "CSIR renovations R800K · Limpopo school kitchens",
  },
  {
    id: "logistics",
    number: "04",
    name: "Logistics & Transport",
    shortName: "Logistics",
    tagline: "National movement, on time",
    description:
      "Our founding service. National long-haul and distribution transport for industrial clients. Reliable scheduling, safe handling, and on-time delivery across all nine provinces.",
    icon: "🚛",
    color: "#C9A24B",
    capabilities: [
      "National long-haul transport",
      "Bulk & palletized distribution",
      "Industrial client contracts",
      "Cross-province logistics",
    ],
    reference: "SAB COOL · ongoing industrial transport",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60, maxWidth: 780 }}
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
            Our Services
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
            Multi-disciplinary.{" "}
            <span style={{ color: "var(--primary)" }}>One-stop service.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            Four core capabilities, one team. We partner with industry
            associates where needed to give clients a fully managed service from
            start to finish.
          </p>
        </motion.div>

        {/* Services grid */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </div>

        {/* Partner note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 60,
            padding: "24px 28px",
            background: "var(--secondary-soft)",
            borderLeft: "4px solid var(--secondary)",
            borderRadius: 8,
            maxWidth: 900,
            margin: "60px auto 0",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--secondary-dark)",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            <strong style={{ fontWeight: 900 }}>Partnership model:</strong> When
            projects fall outside our in-house capabilities, we partner with
            industry associates — ensuring the client&apos;s interests are
            satisfied fully, no matter the scope. One contract, one point of
            contact.
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "relative",
        padding: 36,
        background: "white",
        border: `1px solid ${hovering ? service.color : "var(--border)"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovering
          ? `0 20px 40px ${service.color}22`
          : "0 2px 8px rgba(26, 29, 32, 0.04)",
        minHeight: 420,
      }}
    >
      {/* Blueprint pattern overlay (visible on hover) */}
      <motion.div
        initial={false}
        animate={{ opacity: hovering ? 0.06 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${service.color} 1px, transparent 1px),
            linear-gradient(90deg, ${service.color} 1px, transparent 1px),
            linear-gradient(${service.color} 0.5px, transparent 0.5px),
            linear-gradient(90deg, ${service.color} 0.5px, transparent 0.5px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Colored corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: `radial-gradient(circle at 100% 0%, ${service.color}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top row: number + icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: service.color,
            letterSpacing: 2,
            lineHeight: 1,
          }}
        >
          {service.number}
        </div>
        <motion.div
          animate={{
            scale: hovering ? 1.15 : 1,
            rotate: hovering ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 40,
            filter: `drop-shadow(0 8px 16px ${service.color}33)`,
          }}
        >
          {service.icon}
        </motion.div>
      </div>

      {/* Service name */}
      <h3
        style={{
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: -0.5,
          lineHeight: 1.15,
          color: "var(--text)",
          marginBottom: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.name}
      </h3>

      {/* Tagline */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: service.color,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.tagline}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: 24,
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.description}
      </p>

      {/* Capabilities list (fades in on hover) */}
      <motion.div
        initial={false}
        animate={{
          height: hovering ? "auto" : 0,
          opacity: hovering ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            paddingTop: 20,
            borderTop: `1px solid ${service.color}33`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "var(--text-soft)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Capabilities
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {service.capabilities.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  color: "var(--text)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    color: service.color,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {c}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Reference footer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
          fontSize: 11,
          color: "var(--text-soft)",
          fontWeight: 600,
          letterSpacing: 0.3,
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: service.color, fontWeight: 900 }}>▸ </span>
        {service.reference}
      </div>
    </motion.div>
  );
}