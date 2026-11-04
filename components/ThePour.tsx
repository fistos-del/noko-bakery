"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ThePour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 3D Parallax transforms
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yLogo = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const scaleLogo = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityLogo = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "120vh",
        background: "#FF4500", // The orange from the website
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Immersive Background Element */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: yBackground,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Top Nav Bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "40px 5vw", display: "flex", justifyContent: "space-between", zIndex: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#111" }}>NOKO</div>
        <div style={{ display: "flex", gap: 32, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>
          <Link href="/shop">Shop</Link>
          <Link href="/account">Account</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>

      {/* The 3D Floating Logo Banner */}
      <motion.div
        style={{
          y: yLogo,
          scale: scaleLogo,
          opacity: opacityLogo,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Left Flank Text */}
        <div style={{ position: "absolute", left: -180, top: "50%", transform: "translateY(-50%)", textAlign: "right", color: "#111", fontSize: 14, fontWeight: 700, letterSpacing: 1, lineHeight: 1.6 }} className="hero-flank-left">
          BAKED FRESH.<br/>
          <span style={{ fontStyle: "italic", fontSize: 13 }}>delivered warm.</span>
        </div>

        {/* Center Logo */}
        <div style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(100px, 18vw, 240px)",
          color: "#111", // Black text on orange background
          lineHeight: 0.8,
          textShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}>
          Noko
        </div>

        {/* Right Flank Text */}
        <div style={{ position: "absolute", right: -180, top: "50%", transform: "translateY(-50%)", textAlign: "left", color: "#111", fontSize: 14, fontWeight: 700, letterSpacing: 1, lineHeight: 1.6 }} className="hero-flank-right">
          ARTISAN BAKERY<br/>
          <span style={{ fontStyle: "italic", fontSize: 13 }}>artistic arrangement</span>
        </div>
      </motion.div>

      {/* Immersive Call to Action (from Primal design) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ position: "absolute", bottom: 80, zIndex: 10 }}
      >
        <Link href="/shop" className="btn-black">
          Shop Now
        </Link>
      </motion.div>

      {/* Immersive Badges (from Primal design, styled for Noko) */}
      <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, zIndex: 10 }} className="hero-badges">
        <Badge title="THE NOK​O STANDARD" icon="✦" />
        <Badge title="100% HANDCRAFTED" icon="✦" />
        <Badge title="LOCAL DELIVERY" icon="✦" />
        <Badge title="BAKED DAILY" icon="✦" />
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .hero-flank-left, .hero-flank-right, .hero-badges { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function Badge({ title, icon }: { title: string, icon: string }) {
  return (
    <div style={{ width: 120, height: 120, borderRadius: "50%", border: "2px solid #111", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, fontSize: 10, fontWeight: 900, letterSpacing: 1, background: "#FFF", color: "#111" }}>
      <span style={{ fontSize: 20, marginBottom: 4 }}>{icon}</span>
      {title}
    </div>
  );
}
