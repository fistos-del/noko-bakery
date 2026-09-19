"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Bag3DProps {
  weight?: string;
  color?: string;
  accent?: string;
}

export default function Bag3D({
  weight = "50 kg",
  color = "#8CC63F",
  accent = "#C07F3E",
}: Bag3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -10, y: 30 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: -10, rotY: 30 });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (dragging || !autoRotate) return;
    const id = setInterval(() => {
      setRotation((r) => ({ ...r, y: r.y + 0.4 }));
    }, 30);
    return () => clearInterval(id);
  }, [dragging, autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setAutoRotate(false);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({
      x: dragStart.current.rotX - dy * 0.5,
      y: dragStart.current.rotY + dx * 0.5,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setDragging(true);
    setAutoRotate(false);
    dragStart.current = {
      x: t.clientX,
      y: t.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStart.current.x;
    const dy = t.clientY - dragStart.current.y;
    setRotation({
      x: dragStart.current.rotX - dy * 0.5,
      y: dragStart.current.rotY + dx * 0.5,
    });
  };

  const handleTouchEnd = () => {
    setDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        height: 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1400,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: dragging ? "none" : "transform 0.1s linear",
          position: "relative",
          width: 260,
          height: 380,
        }}
      >
        {/* ── FRONT FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 380,
            background: "white",
            borderRadius: 14,
            transform: "translateZ(48px)",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.04), 0 8px 24px rgba(31,36,32,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #E0E3D9",
          }}
        >
          {/* Top fold */}
          <div
            style={{
              height: 32,
              background: "#F1F4EC",
              borderBottom: "1px dashed #C9CFBF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 8,
                letterSpacing: 3,
                color: "#8B9188",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              · · · · · · · · ·
            </div>
          </div>

          {/* Logo section */}
          <div style={{ padding: "14px 16px 8px", textAlign: "center" }}>
            <div
              style={{
                fontSize: 9,
                color: "#2E4A2E",
                letterSpacing: 2.5,
                textTransform: "uppercase",
                fontWeight: 800,
              }}
            >
              HYA MATLA
            </div>
            <div
              style={{
                fontSize: 8,
                color: accent,
                letterSpacing: 3,
                textTransform: "lowercase",
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              organics
            </div>
          </div>

          {/* Product name */}
          <div style={{ padding: "6px 16px 10px", textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: accent,
                letterSpacing: -0.5,
                lineHeight: 1.1,
                marginBottom: 4,
              }}
            >
              Hya Power
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#5A6257",
                fontWeight: 600,
                letterSpacing: 0.3,
              }}
            >
              Organic Fertiliser
            </div>
          </div>

          {/* Brown circle badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "4px 0 10px",
            }}
          >
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(192, 127, 62, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: 7.5,
                  color: "white",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  letterSpacing: 0.2,
                }}
              >
                For all crops,
                <br />
                flowers, lawn,
                <br />
                plants &amp; shrubs
              </div>
            </div>
          </div>

          {/* Rose circle (proof of effectiveness) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 40% 35%, #FFB6C1 0%, #E8909C 35%, #C2515F 80%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                border: "2px solid #F1F4EC",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              🌹
            </div>
          </div>

          {/* Green bar - USP */}
          <div
            style={{
              background: color,
              padding: "8px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 7,
                color: "white",
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                lineHeight: 1.3,
              }}
            >
              Converting problem Water Hyacinth
              <br />
              into a powerful organic fertiliser
            </div>
          </div>

          {/* Green Agriculture Revolution */}
          <div
            style={{
              padding: "6px 12px",
              textAlign: "center",
              background: "#F1F4EC",
            }}
          >
            <div
              style={{
                fontSize: 7,
                color: "#4E7A1F",
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Green Agriculture Revolution
            </div>
          </div>

          {/* Nutrient preview */}
          <div
            style={{
              flex: 1,
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 6.5,
                color: "#5A6257",
                textAlign: "center",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Macro &amp; Micro Elements
            </div>
            <div
              style={{
                fontSize: 6,
                color: "#8B9188",
                textAlign: "center",
                lineHeight: 1.5,
                fontFamily: "monospace",
              }}
            >
              N 5.27% · P 0.13% · K 0.40%
              <br />
              Mg 0.48% · S 0.38% · Ca 0.54%
              <br />
              Zn · Cu · B · Fe · Mn · Mo
            </div>
          </div>

          {/* Bottom info bar */}
          <div
            style={{
              padding: "8px 14px",
              background: "#2E4A2E",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 7,
                  letterSpacing: 1,
                  opacity: 0.75,
                  fontWeight: 600,
                }}
              >
                NET WEIGHT
              </div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{weight}</div>
            </div>
            <div
              style={{
                fontSize: 6.5,
                letterSpacing: 0.5,
                opacity: 0.85,
                fontWeight: 700,
                textAlign: "right",
                lineHeight: 1.4,
              }}
            >
              Cert. #B5581
              <br />
              Act 36 of 1947
            </div>
          </div>
        </div>

        {/* ── BACK FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 380,
            background: "linear-gradient(160deg, #F1F4EC 0%, #E0E8D5 100%)",
            borderRadius: 14,
            transform: "translateZ(-48px) rotateY(180deg)",
            border: "1px solid #C9CFBF",
            display: "flex",
            flexDirection: "column",
            padding: 20,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "#2E4A2E",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            From Water Hyacinth to Soil
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#5A6257",
              lineHeight: 1.7,
              marginBottom: 14,
            }}
          >
            Harvested at Hartbeespoort Dam
            <br />
            Mineralised in South Africa
            <br />
            Endorsed by FERTASA
          </div>
          <div
            style={{
              fontSize: 8,
              color: "#4E7A1F",
              fontWeight: 700,
              letterSpacing: 1,
              marginTop: 8,
            }}
          >
            TESTED BY INTERTEK
          </div>
        </div>

        {/* ── LEFT FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 96,
            height: 380,
            background: "#F1F4EC",
            borderRadius: 10,
            transform: "translateX(-48px) rotateY(-90deg) translateZ(48px)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #E0E3D9",
          }}
        >
          <div
            style={{
              transform: "rotate(-90deg)",
              fontSize: 10,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#4E7A1F",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            ORGANIC · SINGLE APPLICATION
          </div>
        </div>

        {/* ── RIGHT FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 96,
            height: 380,
            background: "#F1F4EC",
            borderRadius: 10,
            transform: "translateX(212px) rotateY(90deg) translateZ(48px)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #E0E3D9",
          }}
        >
          <div
            style={{
              transform: "rotate(90deg)",
              fontSize: 8,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#C07F3E",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            MADE IN SOUTH AFRICA · DAFF CERTIFIED
          </div>
        </div>

        {/* ── TOP FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 96,
            background: "#E5EBD9",
            transform: "translateY(-48px) rotateX(90deg) translateZ(190px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            border: "1px solid #C9CFBF",
          }}
        >
          <div
            style={{
              fontSize: 7,
              letterSpacing: 3,
              color: "#8B9188",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            · · · · · · · · ·
          </div>
        </div>

        {/* ── BOTTOM FACE ───────────────── */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 96,
            background: "#2E4A2E",
            transform: "translateY(332px) rotateX(90deg) translateZ(190px)",
            borderRadius: 4,
          }}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: autoRotate ? [0.5, 0.85, 0.5] : 0.95 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: 1,
          textTransform: "uppercase",
          fontWeight: 700,
          padding: "6px 14px",
          border: "1px solid var(--border)",
          borderRadius: 100,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        {dragging ? "Release to let it spin" : "← Drag to rotate →"}
      </motion.div>
    </div>
  );
}