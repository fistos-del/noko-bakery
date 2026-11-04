"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface CarouselCard {
  id: string;
  name: string;
  subtitle: string;
  price?: number;
  icon: string;
  color: string;
  href: string;
}

const CARDS: CarouselCard[] = [
  {
    id: "bread",
    name: "Bread Box",
    subtitle: "Signature weekly",
    price: 180,
    icon: "🥖",
    color: "#B5388F",
    href: "/shop/bread-box",
  },
  {
    id: "pastry",
    name: "Pastry Box",
    subtitle: "Weekend favourite",
    price: 220,
    icon: "🥐",
    color: "#D4A843",
    href: "/shop/pastry-box",
  },
  {
    id: "mix",
    name: "Mix Box",
    subtitle: "Best of both",
    price: 200,
    icon: "🥨",
    color: "#8B5A2B",
    href: "/shop/mix-box",
  },
  {
    id: "sub",
    name: "Subscribe",
    subtitle: "Save 15%",
    icon: "🔄",
    color: "#8CC63F",
    href: "/subscription",
  },
  {
    id: "seasonal",
    name: "Seasonal",
    subtitle: "Autumn specials",
    icon: "🍂",
    color: "#E85A24",
    href: "/shop",
  },
  {
    id: "gift",
    name: "Gift Box",
    subtitle: "Coming soon",
    icon: "🎁",
    color: "#1B4965",
    href: "/shop",
  },
];

export default function Carousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_COUNT = CARDS.length;
  const CARD_ANGLE = 360 / CARD_COUNT;
  const RADIUS = 400;
  const FRICTION = 0.95;
  const MIN_VELOCITY = 0.05;

  useEffect(() => {
    // Auto-rotate slowly when idle
    const tick = () => {
      if (!isDragging) {
        if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
          velocityRef.current *= FRICTION;
          setRotation((r) => r + velocityRef.current);
        } else if (!isDragging && Math.abs(velocityRef.current) <= MIN_VELOCITY) {
          // Slow idle rotation
          setRotation((r) => r + 0.05);
        }
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    animationFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isDragging]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt === 0) return;

    const dx = clientX - lastXRef.current;
    const newRotation = rotation + dx * 0.3;

    setRotation(newRotation);
    velocityRef.current = (dx / dt) * 15;

    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "120px 0 80px",
        background:
          "radial-gradient(ellipse at center 60%, #3A2538 0%, #1A0F1F 40%, #0F0810 80%)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginBottom: 80,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Explore the menu
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          Spin the{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #B5388F 0%, #D45BA8 50%, #D4A843 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            carousel
          </span>
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          Drag to spin. Click any box to view it.
        </p>
      </div>

      {/* 3D Carousel scene */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        style={{
          position: "relative",
          height: 420,
          cursor: isDragging ? "grabbing" : "grab",
          perspective: 1400,
          perspectiveOrigin: "center 60%",
        }}
      >
        {/* The ring of cards */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
          }}
        >
          {CARDS.map((card, i) => {
            const angle = i * CARD_ANGLE;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={(e) => {
                  if (!isDragging) {
                    e.stopPropagation();
                    window.location.href = card.href;
                  }
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 200,
                  height: 260,
                  marginLeft: -100,
                  marginTop: -130,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transition: isHovered ? "none" : "filter 0.2s",
                  filter: isHovered
                    ? "brightness(1.2)"
                    : "brightness(0.9)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(160deg, #2A1B2D 0%, #1A0F1F 100%)",
                    border: `2px solid ${card.color}${isHovered ? "" : "55"}`,
                    borderRadius: 20,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: isHovered
                      ? `0 0 40px ${card.color}88, 0 0 80px ${card.color}44`
                      : `0 0 20px ${card.color}33`,
                    transition: "box-shadow 0.3s, border-color 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Inner glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 120,
                      background: `radial-gradient(circle at 50% 0%, ${card.color}33 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontSize: 56,
                        textAlign: "center",
                        marginBottom: 16,
                        filter: `drop-shadow(0 0 20px ${card.color}88)`,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color: "white",
                        textAlign: "center",
                        marginBottom: 4,
                        letterSpacing: -0.3,
                      }}
                    >
                      {card.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.6)",
                        textAlign: "center",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {card.subtitle}
                    </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: 16,
                      borderTop: `1px solid ${card.color}44`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: card.color,
                        letterSpacing: -0.5,
                      }}
                    >
                      {card.price ? `R ${card.price}` : "→"}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 900,
                        color: card.color,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reflective pool */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to top, #0F0810 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Reflected cards (flipped, blurred, faded) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateY(${rotation}deg) scaleY(-1)`,
            opacity: 0.25,
            filter: "blur(3px)",
            pointerEvents: "none",
          }}
        >
          {CARDS.map((card, i) => {
            const angle = i * CARD_ANGLE;
            return (
              <div
                key={`ref-${card.id}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 200,
                  height: 260,
                  marginLeft: -100,
                  marginTop: -130,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  background: `linear-gradient(160deg, ${card.color}22 0%, transparent 100%)`,
                  border: `1px solid ${card.color}33`,
                  borderRadius: 20,
                  boxShadow: `0 0 30px ${card.color}33`,
                }}
              />
            );
          })}
        </div>

        {/* Central glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 100,
            background:
              "radial-gradient(ellipse, rgba(181, 56, 143, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Drag hint */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginTop: 40,
          fontSize: 11,
          color: "var(--text-soft)",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        ← Drag to spin · Tap a card to view →
      </div>
    </section>
  );
}
