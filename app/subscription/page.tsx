"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const PLANS = [
  { key: "standard", name: "Standard Box", pricePerMonth: 600, savings: "Save R 30/month", icon: "🥖", description: "Bread Box every week", includes: ["1 artisan loaf", "1 focaccia", "4 bagels", "2 cinnamon twists"], accent: "var(--text)" },
  { key: "premium", name: "Premium Box", pricePerMonth: 800, savings: "Save R 80/month", icon: "🥐", description: "Pastry Box every week", includes: ["4 croissants", "2 sausage rolls", "2 pain au chocolat", "2 danish"], accent: "var(--primary)", featured: true },
  { key: "family", name: "Family Box", pricePerMonth: 900, savings: "Save R 100/month", icon: "🥨", description: "Mix Box every week", includes: ["4 croissants", "1 focaccia", "1 loaf of bread", "2 danish"], accent: "var(--text)" },
];

export default function SubscriptionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yLogo = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const scaleLogo = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityLogo = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} style={{ background: "var(--bg)", perspective: "1000px" }}>
      
      {/* THE 3D ORANGE HERO */}
      <section
        style={{
          position: "relative",
          height: "120vh",
          background: "#FF4500",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 24px",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: yBackground,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

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
          <div style={{ position: "absolute", left: -180, top: "50%", transform: "translateY(-50%)", textAlign: "right", color: "#111", fontSize: 14, fontWeight: 700, letterSpacing: 1, lineHeight: 1.6 }} className="hero-flank-left">
            BAKED FRESH.<br/><span style={{ fontStyle: "italic", fontSize: 13 }}>delivered warm.</span>
          </div>

          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(100px, 18vw, 240px)",
            color: "#111",
            lineHeight: 0.8,
            textShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}>
            Noko
          </div>

          <div style={{ position: "absolute", right: -180, top: "50%", transform: "translateY(-50%)", textAlign: "left", color: "#111", fontSize: 14, fontWeight: 700, letterSpacing: 1, lineHeight: 1.6 }} className="hero-flank-right">
            ARTISAN BAKERY<br/><span style={{ fontStyle: "italic", fontSize: 13 }}>artistic arrangement</span>
          </div>
        </motion.div>

        <div style={{ position: "absolute", bottom: 40, zIndex: 10 }}>
          <Link href="#plans" className="btn-black" style={{ background: "#111", color: "#FFF", border: "2px solid #111" }}>
            View Plans ↓
          </Link>
        </div>
      </section>

      {/* PLANS SECTION */}
      <section id="plans" style={{ padding: "120px 5vw", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginBottom: 20, color: "var(--text)" }}>
              Better Ingredients.<br/>Better Flavor.
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 600, margin: "0 auto" }}>
              Choose the subscription that fits your lifestyle.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PLANS.map((plan, i) => (
              <motion.div 
                key={plan.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: 40, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, display: "flex", flexDirection: "column" }}
              >
                <div style={{ fontSize: 60, marginBottom: 20 }}>{plan.icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>{plan.description}</p>
                <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text)", marginBottom: 8 }}>
                  R {plan.pricePerMonth}
                  <span style={{ fontSize: 16, color: "var(--text-muted)" }}> /mo</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "var(--primary)", marginBottom: 24 }}>{plan.savings}</div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8, marginBottom: 32, flex: 1 }}>
                  {plan.includes.map((item, i) => <li key={i} style={{ fontSize: 13, color: "var(--text)" }}>✓ {item}</li>)}
                </ul>
                <button style={{ width: "100%", padding: 16, background: plan.featured ? "var(--primary)" : "var(--text)", color: "#FFF", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 800, textTransform: "uppercase", cursor: "pointer" }}>
                  Subscribe
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 1000px) { .hero-flank-left, .hero-flank-right { display: block !important; } }
        @media (max-width: 1000px) { .hero-flank-left, .hero-flank-right { display: none !important; } }
      `}</style>
    </div>
  );
}
