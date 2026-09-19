"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export interface ProductCardData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  icon: string;
  price: number;
  priceNote: string;
  stockTons: number;
  description: string;
  features: string[];
  color: string;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const fgX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const fgY = useTransform(mouseY, [-1, 1], [-12, 12]);
  const midX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const midY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const bgX = useTransform(mouseX, [-1, 1], [-4, 4]);
  const bgY = useTransform(mouseY, [-1, 1], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        position: "relative",
        height: 460,
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovering
          ? "0 20px 40px rgba(31, 36, 32, 0.10)"
          : "0 2px 8px rgba(31, 36, 32, 0.04)",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background layer - subtle accent */}
      <motion.div
        style={{
          x: bgX,
          y: bgY,
          position: "absolute",
          inset: -20,
          background: `radial-gradient(circle at 25% 15%, ${product.color}15 0%, transparent 55%)`,
        }}
      />

      {/* Mid layer - category badge */}
      <motion.div
        style={{
          x: midX,
          y: midY,
          position: "absolute",
          top: 20,
          right: 20,
          padding: "6px 14px",
          background: `${product.color}18`,
          border: `1px solid ${product.color}55`,
          borderRadius: 100,
          fontSize: 10,
          fontWeight: 800,
          color: product.color,
          letterSpacing: 1.2,
          textTransform: "uppercase",
        }}
      >
        {product.category}
      </motion.div>

      {/* Foreground layer - main content */}
      <motion.div
        style={{
          x: fgX,
          y: fgY,
          position: "absolute",
          inset: 0,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <motion.div
          animate={{ scale: hovering ? 1.12 : 1, rotate: hovering ? 6 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 56,
            marginBottom: 20,
            filter: `drop-shadow(0 8px 20px ${product.color}33)`,
          }}
        >
          {product.icon}
        </motion.div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: product.color,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {product.tagline}
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            marginBottom: 10,
            color: "var(--text)",
            letterSpacing: -0.4,
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          {product.description}
        </p>

        {/* Features - fade in on hover */}
        <motion.div
          animate={{ opacity: hovering ? 1 : 0, height: hovering ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden", marginBottom: 16 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {product.features.map((f) => (
              <span
                key={f}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 8px",
                  background: "var(--surface-2)",
                  color: "var(--text-muted)",
                  borderRadius: 100,
                  letterSpacing: 0.3,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Price row */}
        <div
          style={{
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: "var(--text-soft)",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              {product.priceNote}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: -0.5,
              }}
            >
              R {product.price.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              color: product.color,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: product.color,
                boxShadow: `0 0 8px ${product.color}66`,
              }}
            />
            {product.stockTons}t in stock
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}