"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  hoverScale?: number;
  shadowColor?: string;
  style?: React.CSSProperties;
}

export default function MagneticCard({
  children,
  maxTilt = 10,
  hoverScale = 1.02,
  shadowColor = "rgba(181, 56, 143, 0.35)",
  style,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    rotateY.set(xPct * maxTilt);
    rotateX.set(-yPct * maxTilt);
  };

  const handleMouseEnter = () => setHovering(true);

  const handleMouseLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1200, ...style }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
          scale: hovering ? hoverScale : 1,
          boxShadow: hovering
            ? `0 24px 60px ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.05) inset`
            : "0 2px 8px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease, scale 0.3s ease",
          willChange: "transform",
          borderRadius: 20,
          height: "100%",
          position: "relative",
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background:
              "radial-gradient(circle at 50% 0%, rgba(181, 56, 143, 0.2) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
