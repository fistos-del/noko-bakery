"use client";

import { motion } from "framer-motion";

export default function DrawnKey({ visible = true }: { visible?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 1.2 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -10 }}
        animate={{ rotate: visible ? 0 : 15 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      >
        {/* Key head (circle) */}
        <motion.circle
          cx="45"
          cy="45"
          r="20"
          stroke="var(--primary-light)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        {/* Key inner detail (cross) */}
        <motion.path
          d="M 45 32 L 45 58 M 32 45 L 58 45"
          stroke="var(--primary-light)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Key shaft */}
        <motion.path
          d="M 62 45 L 100 45"
          stroke="var(--primary-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
        />

        {/* Key teeth (down and up) */}
        <motion.path
          d="M 82 45 L 82 58 L 88 58 L 88 50"
          stroke="var(--primary-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeInOut" }}
        />

        {/* Glow dot */}
        <motion.circle
          cx="100"
          cy="45"
          r="2.5"
          fill="var(--primary)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />
      </motion.svg>
    </motion.div>
  );
}
