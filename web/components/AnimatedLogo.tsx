"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedLogo() {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: hovering ? [0, -8, 6, -4, 0] : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Water line */}
        <motion.path
          d="M2 24 Q8 22 16 24 T30 24"
          stroke="#3D7A8F"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          animate={{ y: hovering ? -1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Stem */}
        <motion.path
          d="M16 24 L16 12"
          stroke="#6FA82A"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ pathLength: hovering ? 1 : 0.85 }}
          transition={{ duration: 0.4 }}
        />

        {/* Left leaf */}
        <motion.path
          d="M16 17 Q10 15 9 8 Q15 9 16 17"
          fill="#6FA82A"
          animate={{
            scale: hovering ? 1.15 : 1,
            rotate: hovering ? -6 : 0,
          }}
          style={{ transformOrigin: "16px 17px" }}
          transition={{ duration: 0.4 }}
        />

        {/* Right leaf (earth brown) */}
        <motion.path
          d="M16 15 Q22 12 23 5 Q17 6 16 15"
          fill="#8D5B2A"
          animate={{
            scale: hovering ? 1.15 : 1,
            rotate: hovering ? 6 : 0,
          }}
          style={{ transformOrigin: "16px 15px" }}
          transition={{ duration: 0.4 }}
        />

        {/* Hyacinth flower bud (small purple dot) */}
        <motion.circle
          cx="16"
          cy="9"
          r="1.6"
          fill="#6B4E9E"
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>

      <motion.div
        animate={{ letterSpacing: hovering ? "0.3px" : "0px" }}
        transition={{ duration: 0.3 }}
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.1,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: -0.3,
          }}
        >
          HYA MATLA
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "var(--secondary)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Organics
        </span>
      </motion.div>
    </div>
  );
}