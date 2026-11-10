"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [position, setPosition] = useState(50); // 0-100
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-animate on first view to tease the interaction
  useEffect(() => {
    if (!inView || hasInteracted) return;
    let frame = 0;
    let dir = 1;
    const interval = setInterval(() => {
      frame += 1;
      setPosition((p) => {
        const next = p + dir * 0.6;
        if (next > 70) {
          dir = -1;
          return 70;
        }
        if (next < 30) {
          dir = 1;
          return 30;
        }
        return next;
      });
      if (frame > 120) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [inView, hasInteracted]);

  const updateFromEvent = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setHasInteracted(true);
    updateFromEvent(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    updateFromEvent(e.clientX);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    setHasInteracted(true);
    updateFromEvent(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    updateFromEvent(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  return (
    <section
      id="before-after"
      ref={sectionRef}
      style={{
        padding: "120px 40px",
        background: "var(--charcoal-dark)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle diagonal stripes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(232, 90, 36, 0.04) 0px, rgba(232, 90, 36, 0.04) 1px, transparent 1px, transparent 40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 50, maxWidth: 780 }}
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
            Case Study
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              color: "white",
              marginBottom: 20,
            }}
          >
            From poor workmanship to{" "}
            <span style={{ color: "var(--primary)" }}>properly built.</span>
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 680,
            }}
          >
            When other contractors left 800 RDP houses unfinished and poorly
            built, the Department of Housing appointed us to fix it. Drag the
            slider to see the transformation.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              height: "clamp(320px, 50vw, 560px)",
              cursor: dragging ? "grabbing" : "ew-resize",
              background: "#0F1113",
            }}
          >
            {/* ─── AFTER (base layer) ─── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(135deg, #F4F4F2 0%, #E5E5E2 100%)
                `,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Stylized "after" building illustration */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(232, 90, 36, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(232, 90, 36, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  color: "#1A1D20",
                }}
              >
                <div style={{ fontSize: "clamp(60px, 12vw, 140px)", marginBottom: 20 }}>
                  🏘️
                </div>
                <div
                  style={{
                    fontSize: "clamp(20px, 3vw, 32px)",
                    fontWeight: 900,
                    letterSpacing: -0.5,
                    marginBottom: 8,
                    color: "var(--secondary)",
                  }}
                >
                  AFTER
                </div>
                <div
                  style={{
                    fontSize: "clamp(12px, 1.5vw, 15px)",
                    color: "#5C6367",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    maxWidth: 380,
                    margin: "0 auto",
                  }}
                >
                  Plastered · Backwashed · Painted · Plumbed
                  <br />
                  Sewer reticulation complete
                </div>
              </div>
              {/* AFTER badge */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  padding: "8px 16px",
                  background: "var(--primary)",
                  color: "white",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                After · Jorud
              </div>
            </div>

            {/* ─── BEFORE (clipped overlay) ─── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
                background: `
                  linear-gradient(135deg, #2B2B2B 0%, #1A1A1A 100%)
                `,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: dragging ? "none" : "clip-path 0.05s linear",
              }}
            >
              {/* Cracked pattern */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                    repeating-linear-gradient(-30deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 25px),
                    repeating-linear-gradient(60deg, rgba(232, 90, 36, 0.05) 0px, rgba(232, 90, 36, 0.05) 1px, transparent 1px, transparent 40px)
                  `,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(60px, 12vw, 140px)",
                    marginBottom: 20,
                    filter: "grayscale(1) brightness(0.6)",
                  }}
                >
                  🏚️
                </div>
                <div
                  style={{
                    fontSize: "clamp(20px, 3vw, 32px)",
                    fontWeight: 900,
                    letterSpacing: -0.5,
                    marginBottom: 8,
                    color: "#B33A3A",
                  }}
                >
                  BEFORE
                </div>
                <div
                  style={{
                    fontSize: "clamp(12px, 1.5vw, 15px)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    maxWidth: 380,
                    margin: "0 auto",
                  }}
                >
                  Poor workmanship · Cracked plaster
                  <br />
                  Blocked plumbing · Unfinished units
                </div>
              </div>
              {/* BEFORE badge */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  padding: "8px 16px",
                  background: "#B33A3A",
                  color: "white",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Before · Other Contractor
              </div>
            </div>

            {/* ─── Divider handle ─── */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${position}%`,
                width: 4,
                background: "var(--primary)",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                boxShadow: "0 0 20px rgba(232, 90, 36, 0.6)",
                zIndex: 3,
              }}
            >
              {/* Handle circle */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  border: "4px solid white",
                  boxShadow:
                    "0 8px 24px rgba(232, 90, 36, 0.5), 0 0 0 6px rgba(232, 90, 36, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 20,
                  fontWeight: 900,
                  cursor: dragging ? "grabbing" : "grab",
                }}
              >
                <span style={{ transform: "translateX(-2px)" }}>◀</span>
                <span style={{ transform: "translateX(2px)" }}>▶</span>
              </div>

              {/* Top grip */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  opacity: 0.9,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                Drag
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="stats-row"
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <Stat value="800" label="Houses rectified" />
          <Stat value="4" label="Service disciplines" />
          <Stat value="100%" label="Handover complete" />
          <Stat value="Servcon" label="Client · Dept of Housing" />
        </motion.div>

        {/* Context note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: 32,
            padding: "20px 24px",
            background: "rgba(232, 90, 36, 0.08)",
            borderLeft: "4px solid var(--primary)",
            borderRadius: 8,
            maxWidth: 800,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "var(--primary)", fontWeight: 900 }}>
              Project scope:
            </strong>{" "}
            Plastering · Backwash · Painting · Plumbing · Sewer reticulation —
            across 800 RDP units under Servcon (Dept of Housing agency). All
            units delivered to handover standard.
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .stats-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        padding: "24px 28px",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: "var(--primary)",
          letterSpacing: -1,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255, 255, 255, 0.65)",
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}