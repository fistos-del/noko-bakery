"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function JorudLogo() {
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
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: hovering ? [0, -6, 6, -4, 0] : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Orange circle */}
        <circle cx="20" cy="20" r="19" fill="#E85A24" />
        <circle
          cx="20"
          cy="20"
          r="19"
          fill="none"
          stroke="#1B4965"
          strokeWidth="1.5"
        />

        {/* Porcupine - front facing with spikes */}
        <g fill="white">
          {/* Spikes fanning outward - upper arc */}
          <path d="M20 6 L18.5 11 L21.5 11 Z" />
          <path d="M15 7.5 L14 12 L16.5 11.2 Z" />
          <path d="M25 7.5 L23.5 11.2 L26 12 Z" />
          <path d="M10.5 10.5 L10.5 14.5 L13 13 Z" />
          <path d="M29.5 10.5 L27 13 L29.5 14.5 Z" />
          <path d="M7 15 L8.5 18.5 L10.5 16 Z" />
          <path d="M33 15 L29.5 16 L31.5 18.5 Z" />

          {/* Spikes - side rows */}
          <path d="M6.5 20 L9 22 L10 19 Z" />
          <path d="M33.5 20 L30 19 L31 22 Z" />

          {/* Body / face */}
          <ellipse cx="20" cy="22" rx="6.5" ry="7" fill="white" />

          {/* Face details (dark) */}
          <circle cx="18" cy="20" r="1" fill="#E85A24" />
          <circle cx="22" cy="20" r="1" fill="#E85A24" />
          <ellipse cx="20" cy="23.5" rx="1.2" ry="0.8" fill="#E85A24" />
          {/* Snout */}
          <circle cx="20" cy="25" r="0.7" fill="#1B4965" />
        </g>
      </motion.svg>

      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "var(--primary)",
            letterSpacing: -0.3,
          }}
        >
          JORUD
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "var(--secondary)",
            letterSpacing: 2.5,
            textTransform: "uppercase",
            marginTop: 1,
          }}
        >
          Solutions
        </span>
      </div>
    </div>
  );
}