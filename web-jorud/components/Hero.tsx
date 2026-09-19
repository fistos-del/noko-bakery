"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  stat: string;
  statLabel: string;
}

const SERVICES: Service[] = [
  {
    id: "civil",
    label: "Civil & General Building",
    title: "We build the roads, the pipes, and the places people live.",
    description:
      "From 800 RDP house rectifications under Servcon to municipal access roads and stormwater systems for Public Works.",
    icon: "🏗️",
    color: "#E85A24",
    stat: "800+",
    statLabel: "RDP houses rectified",
  },
  {
    id: "horticulture",
    label: "Horticulture",
    title: "We keep public spaces clean, green, and functional.",
    description:
      "Grass cutting, tree felling, and maintenance for Ekurhuleni Metro Parks, Johannesburg Water, and municipalities across Gauteng.",
    icon: "🌿",
    color: "#4E7A1F",
    stat: "6+",
    statLabel: "Municipal contracts",
  },
  {
    id: "steel",
    label: "Steel Engineering",
    title: "Structural steel work, fabricated and installed to spec.",
    description:
      "Kitchen apartment erection in Limpopo schools, partitioning for CSIR, and steel fabrication for industrial clients.",
    icon: "⚙️",
    color: "#1B4965",
    stat: "R800K",
    statLabel: "CSIR contract value",
  },
  {
    id: "logistics",
    label: "Logistics & Transport",
    title: "National product movement — where it needs to be, on time.",
    description:
      "From our founding roots in transport. Long-haul services for SAB COOL and industrial clients across South Africa.",
    icon: "🚛",
    color: "#C9A24B",
    stat: "1999",
    statLabel: "Founded in transport",
  },
];

const STATS = [
  { value: "25+", label: "Years Operating" },
  { value: "100%", label: "Black Owned" },
  { value: "L3", label: "B-BBEE Level" },
  { value: "6+", label: "Municipal Contracts" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // Auto-rotate services every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SERVICES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const service = SERVICES[active];

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 100,
        paddingBottom: 60,
        background: "var(--bg-alt)",
        overflow: "hidden",
      }}
    >
      {/* Subtle diagonal stripes background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(232, 90, 36, 0.03) 0px, rgba(232, 90, 36, 0.03) 1px, transparent 1px, transparent 40px)",
          pointerEvents: "none",
        }}
      />

      {/* Top charcoal stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "var(--charcoal)",
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main grid: text left, showcase right */}
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 60,
            alignItems: "center",
            minHeight: "calc(100vh - 220px)",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {/* ─── LEFT: Text ───────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 800,
                color: "var(--text-muted)",
                marginBottom: 28,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  boxShadow: "0 0 0 3px rgba(232, 90, 36, 0.15)",
                }}
              />
              Est. 1999 · Pretoria, South Africa
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: -2,
                marginBottom: 28,
                color: "var(--text)",
              }}
            >
              Building South Africa&apos;s{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: "var(--primary)",
                }}
              >
                infrastructure
                <span
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 0,
                    right: 0,
                    height: 6,
                    background: "var(--secondary)",
                    opacity: 0.25,
                    zIndex: -1,
                  }}
                />
              </span>{" "}
              since 1999.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 560,
              }}
            >
              Jorud Solutions is a multi-disciplinary construction and logistics
              company — 100% black-owned, CIDB & NHBRC registered, and
              B-BBEE Level 3. From civil works to horticulture to national
              transport.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#projects"
                style={{
                  padding: "16px 28px",
                  background: "var(--primary)",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  boxShadow: "0 4px 24px rgba(232, 90, 36, 0.25)",
                  transition: "transform 0.2s",
                }}
              >
                View Our Projects →
              </a>
              <a
                href="#tender"
                style={{
                  padding: "16px 28px",
                  background: "white",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  boxShadow: "0 2px 8px rgba(26, 29, 32, 0.04)",
                }}
              >
                Tender Portal
              </a>
            </motion.div>

            {/* WhatsApp quick line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                marginTop: 32,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                }}
              >
                💬
              </span>
              <span>
                Quick quotes on WhatsApp:{" "}
                <a
                  href="https://wa.me/27827815071"
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "var(--primary)",
                    fontWeight: 800,
                    textDecoration: "underline",
                  }}
                >
                  082 781 5071
                </a>
              </span>
            </motion.div>
          </div>

          {/* ─── RIGHT: Service showcase ───────── */}
          <div
            style={{
              position: "relative",
              minHeight: 460,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: 36,
                  boxShadow: "0 24px 64px rgba(26, 29, 32, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Colored left accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 5,
                    background: service.color,
                  }}
                />

                {/* Service badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px",
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}44`,
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 800,
                    color: service.color,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    marginBottom: 24,
                  }}
                >
                  <span>{service.icon}</span>
                  {service.label}
                </div>

                <h2
                  style={{
                    fontSize: "clamp(24px, 2.8vw, 32px)",
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: -0.8,
                    color: "var(--text)",
                    marginBottom: 20,
                  }}
                >
                  {service.title}
                </h2>

                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 28,
                  }}
                >
                  {service.description}
                </p>

                {/* Stat block */}
                <div
                  style={{
                    paddingTop: 24,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 900,
                      color: service.color,
                      letterSpacing: -2,
                      lineHeight: 1,
                    }}
                  >
                    {service.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {service.statLabel}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Service selector dots */}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  aria-label={`View ${s.label}`}
                  style={{
                    width: i === active ? 32 : 10,
                    height: 10,
                    borderRadius: 100,
                    background:
                      i === active ? s.color : "var(--border-dark)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Service labels row (desktop only) */}
            <div
              className="only-desktop"
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    color:
                      i === active ? s.color : "var(--text-soft)",
                    cursor: "pointer",
                    padding: "6px 4px",
                    transition: "color 0.3s",
                  }}
                >
                  {s.icon} {s.label.split(" & ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom stat strip ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-stats"
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            background: "var(--charcoal)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "24px 28px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "var(--primary)",
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            min-height: auto !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-stats > div:nth-child(3) {
            border-left: none !important;
          }
          .hero-stats > div:nth-child(n + 3) {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
        @media (max-width: 500px) {
          .hero-stats {
            grid-template-columns: 1fr !important;
          }
          .hero-stats > div {
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          .hero-stats > div:first-child {
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}