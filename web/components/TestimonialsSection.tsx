"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  farm: string;
  region: string;
  crop: string;
  hectares: string;
  result: string;
  resultLabel: string;
  quote: string;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Pieter van der Merwe",
    farm: "Kroonstad Organic Co-op",
    region: "Free State",
    crop: "Organic Maize",
    hectares: "450 ha",
    result: "+22%",
    resultLabel: "yield gain",
    quote:
      "We were sceptical — a fertilizer made from a weed? But after two seasons, our organic certification is intact and our soil biology has never been healthier. Yields are up 22%.",
    accent: "#6FA82A",
  },
  {
    id: "2",
    name: "Hendrik van Wyk",
    farm: "Klein Drakenstein Vineyards",
    region: "Western Cape",
    crop: "Organic Vineyard",
    hectares: "85 ha",
    result: "+18%",
    resultLabel: "yield gain",
    quote:
      "Single application per season, and no leaching. For a vineyard selling into EU organic markets, that combination is worth everything. EU inspectors passed us first time.",
    accent: "#3D7A8F",
  },
  {
    id: "3",
    name: "Thandi Nkosi",
    farm: "Mthonjaneni Regenerative Farms",
    region: "KwaZulu-Natal",
    crop: "Pasture & Livestock",
    hectares: "620 ha",
    result: "+31%",
    resultLabel: "pasture yield",
    quote:
      "The difference from synthetic fertilizer is obvious. Our soil is dark and alive, not crusted. We got a second cut we didn't plan for. PastureBoost days are behind us.",
    accent: "#4E7A1F",
  },
  {
    id: "4",
    name: "Sipho Mokoena",
    farm: "Highveld Organic Vegetables",
    region: "Gauteng",
    crop: "Certified Organic Vegetables",
    hectares: "40 ha",
    result: "+26%",
    resultLabel: "yield gain",
    quote:
      "We grow for Woolworths Organic and Pick n Pay Green Range. Hya Power passed every residue test — zero chemical traces. Root development in leafy greens within 10 days.",
    accent: "#8D5B2A",
  },
  {
    id: "5",
    name: "Annemarie Botha",
    farm: "Blyde River Citrus",
    region: "Mpumalanga",
    crop: "Organic Citrus",
    hectares: "120 ha",
    result: "+19%",
    resultLabel: "yield gain",
    quote:
      "The consistency is what sells me. Same nutrient profile, same performance, every single bag. And I know every bag came from a dam that needed clearing.",
    accent: "#6B4E9E",
  },
  {
    id: "6",
    name: "Johannes Molefe",
    farm: "Vaal Regenerative Collective",
    region: "Free State",
    crop: "Mixed Organic Crops",
    hectares: "28 ha",
    result: "+24%",
    resultLabel: "soil carbon",
    quote:
      "We're measuring soil carbon on our plots. After 18 months on Hya Power, our organic matter is up 24%. That's not just fertilizer — that's regenerative agriculture.",
    accent: "#C9A24B",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{
        padding: "120px 40px",
        background: "var(--bg-alt)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 60, maxWidth: 760 }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--primary-dark)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            Farmer Stories
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Trusted by{" "}
            <span style={{ color: "var(--secondary)" }}>
              South African organic growers
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            Farmers across all 9 provinces use Hya Power to grow certified
            organic produce. Move your cursor over any story to see it come
            alive.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovering, setHovering] = useState(false);
  const ripplesRef = useRef<
    { x: number; y: number; r: number; life: number }[]
  >([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Soft gradient background (lighter for light theme)
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, testimonial.accent + "20");
      grad.addColorStop(0.5, testimonial.accent + "08");
      grad.addColorStop(1, "#FFFFFF");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle field rows
      ctx.strokeStyle = testimonial.accent + "18";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (h / 12) * i);
        ctx.lineTo(w, (h / 12) * i + Math.sin(i) * 3);
        ctx.stroke();
      }

      // Ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.life -= 0.015;
        r.r += 3;
        if (r.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle =
          testimonial.accent +
          Math.floor(r.life * 120).toString(16).padStart(2, "0");
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [testimonial.accent]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = Date.now();
    if (now - lastSpawnRef.current > 150) {
      lastSpawnRef.current = now;
      ripplesRef.current.push({ x, y, r: 4, life: 1 });
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        height: 340,
        borderRadius: 16,
        overflow: "hidden",
        background: "white",
        border: `1px solid ${hovering ? testimonial.accent : "var(--border)"}`,
        transition: "border-color 0.3s, box-shadow 0.3s",
        cursor: "crosshair",
        boxShadow: hovering
          ? `0 12px 32px ${testimonial.accent}22`
          : "0 2px 8px rgba(31, 36, 32, 0.04)",
      }}
      whileHover={{ y: -6 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 40,
              color: testimonial.accent,
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              marginBottom: 12,
            }}
          >
            &ldquo;
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text)",
              fontWeight: 500,
            }}
          >
            {testimonial.quote}
          </p>
        </div>

        <div>
          <div
            style={{
              paddingTop: 16,
              borderTop: `1px solid ${testimonial.accent}33`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: -0.2,
                }}
              >
                {testimonial.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {testimonial.farm}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: testimonial.accent,
                  marginTop: 6,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 800,
                }}
              >
                {testimonial.crop} · {testimonial.hectares}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: testimonial.accent,
                  letterSpacing: -0.8,
                }}
              >
                {testimonial.result}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "var(--text-soft)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                {testimonial.resultLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}