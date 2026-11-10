"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Earth-tone palette: leaf green, earth brown, water blue, hyacinth purple
    const colors = ["#6FA82A", "#8D5B2A", "#3D7A8F", "#6B4E9E", "#4E7A1F"];
    const particles: Particle[] = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 180 + Math.random() * 260;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius * 0.55;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        p.vx += (p.baseX - p.x) * 0.005;
        p.vy += (p.baseY - p.y) * 0.005;

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const onMouse = (e: MouseEvent) =>
      setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouse);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animationFrame);
    };
  }, [mouse]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F7F7F3 60%, #EEF2E8 100%)",
        paddingTop: 100,
        paddingBottom: 60,
      }}
    >
      {/* Soft sage circle backdrop */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(111, 168, 42, 0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Water ripple rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 80vw)",
          height: "min(700px, 80vw)",
          borderRadius: "50%",
          border: "1px solid rgba(61, 122, 143, 0.12)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(500px, 60vw)",
          height: "min(500px, 60vw)",
          borderRadius: "50%",
          border: "1px solid rgba(61, 122, 143, 0.08)",
          pointerEvents: "none",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 980,
          padding: "0 40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            background: "rgba(111, 168, 42, 0.12)",
            border: "1px solid rgba(111, 168, 42, 0.35)",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 700,
            color: "var(--primary-dark)",
            marginBottom: 28,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          🌿 Inspected by ECOCERT SA · Circular Economy
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          style={{
            fontSize: "clamp(38px, 6.5vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 28,
            color: "var(--text)",
          }}
        >
                    Turning water&apos;s{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #8CC63F 0%, #C07F3E 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 6s ease infinite",
            }}
          >
            worst weed
          </span>{" "}
          into Africa&apos;s{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #8CC63F 0%, #2E4A2E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            best soil
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          style={{
            fontSize: "clamp(15px, 1.8vw, 19px)",
            color: "var(--text-muted)",
            marginBottom: 40,
            maxWidth: 720,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "var(--text)", fontWeight: 700 }}>
            Hya Power
          </strong>{" "}
          is a 100% organic fertilizer — harvested from invasive water hyacinth,
          mineralised into 16 essential plant nutrients, and bonded to your soil
          for the whole season. No chemicals. No leaching. No waste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#quote"
            style={{
              padding: "16px 32px",
              background: "var(--primary)",
              color: "white",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 4px 24px rgba(111, 168, 42, 0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Get a Bulk Quote →
          </a>
          <a
            href="#journey"
            style={{
              padding: "16px 32px",
              background: "white",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(31, 36, 32, 0.06)",
            }}
          >
            See the Process
          </a>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          style={{
            marginTop: 60,
            display: "flex",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 60px)",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "16", label: "Nutrients" },
            { value: "100%", label: "Organic" },
            { value: "1x", label: "Per Season" },
            { value: "0", label: "Chemicals" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 800,
                  color: "var(--primary-dark)",
                  letterSpacing: -0.5,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-soft)",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          color: "var(--text-soft)",
          fontSize: 20,
        }}
      >
        ↓
      </motion.div>
    </section>
  );
}