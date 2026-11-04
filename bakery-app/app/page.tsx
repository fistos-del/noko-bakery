"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const PRODUCTS = [
  { id: "bread-box", name: "The Bread Box", price: 180, icon: "🥖", desc: "1 Artisan loaf, 1 Focaccia, 4 Bagels, 2 Twists" },
  { id: "pastry-box", name: "The Pastry Box", price: 220, icon: "🥐", desc: "4 Croissants, 2 Sausage Rolls, 2 Pain au Chocolat" },
  { id: "mix-box", name: "The Mix Box", price: 200, icon: "🥨", desc: "The best of both worlds. Bread and Pastries combined." },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroTextScale = useTransform(heroScroll, [0, 1], [1, 0.8]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const productRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: productScroll } = useScroll({
    target: productRef,
    offset: ["start end", "end start"],
  });
  
  const productY = useTransform(productScroll, [0, 1], [100, -100]);
  const productScale = useTransform(productScroll, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div ref={containerRef} style={{ background: "var(--bg)", color: "var(--text)", overflowX: "hidden", perspective: "1000px" }}>
      
      {/* 1. IMMERSIVE HERO */}
      <section
        style={{
          height: "100vh",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />
        
        <motion.div style={{ scale: heroTextScale, opacity: heroTextOpacity, zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "var(--text)", lineHeight: 0.9, marginBottom: 24 }}
          >
            Baked fresh. <br />
            <span style={{ color: "var(--primary)" }}>Delivered warm.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 40 }}
          >
            Artisan breads, pastries, and curated boxes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Link href="/shop" className="btn-black">
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. PRODUCT SECTION */}
      <motion.section
        ref={productRef}
        style={{ 
          y: productY, 
          scale: productScale,
          padding: "120px 5vw", 
          background: "var(--bg-alt)",
          transformStyle: "preserve-3d"
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginBottom: 20, color: "var(--text)" }}>
              Better Ingredients.<br/>Better Flavor.
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 600, margin: "0 auto" }}>
              We source only the finest local ingredients. Slow-fermented, hand-shaped, and baked to perfection every single morning.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-stack-mobile">
            
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ background: "var(--bg)", border: "2px solid var(--border)", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 16 }}
            >
              <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                {PRODUCTS.map((p, i) => (
                  <div key={i} style={{ width: 80, height: 120, background: "var(--surface)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, transform: `rotate(${i === 0 ? -5 : i === 2 ? 5 : 0}deg)` }}>
                    {p.icon}
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16, color: "var(--text)" }}>BEST SELLERS</h3>
              <Link href="/shop" className="btn-orange" style={{ padding: "12px 24px", fontSize: 12 }}>
                Shop All
              </Link>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {PRODUCTS.map((p) => (
                <Link key={p.id} href={`/shop/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 24, textDecoration: "none", borderBottom: "2px solid var(--border)", paddingBottom: 24 }}>
                  <div style={{ width: 100, height: 100, background: "var(--surface)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, flexShrink: 0, borderRadius: 12 }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginBottom: 4 }}>{p.name}</h4>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4 }}>{p.desc}</p>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "var(--primary)", marginTop: 8 }}>R {p.price}.00</div>
                  </div>
                  <div style={{ fontSize: 24, color: "var(--text)" }}>→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. THE CLEANEST BREAD */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 500 }}
        className="grid-stack-mobile"
      >
        <div style={{ background: "#111111", padding: "80px 5vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: 500, margin: "0 auto", width: "100%" }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: "var(--primary)", marginBottom: 16 }}>
              THE NOKO STANDARD
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#FFF", lineHeight: 1.1, marginBottom: 24 }}>
              Restoring connection to real food.
            </h2>
            <p style={{ fontSize: 16, color: "#AAA", lineHeight: 1.6, marginBottom: 32 }}>
              We believe in the health of people, animals, and land. That's why we bake with zero preservatives, zero shortcuts, and 100% locally sourced ingredients.
            </p>
            <Link href="/shop" className="btn-orange" style={{ padding: "16px 32px", fontSize: 12, display: "inline-block" }}>
              Taste the Difference
            </Link>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", background: "#111" }}>
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="/logo.svg" 
            alt="Noko Bread" 
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: 80, filter: "invert(1) brightness(2)" }} 
          />
        </div>
      </motion.section>

      <style>{`
        @media (max-width: 900px) { 
          .grid-stack-mobile { grid-template-columns: 1fr !important; } 
        }
      `}</style>
    </div>
  );
}
