"use client";

import { motion } from "framer-motion";
import ProductCard, { ProductCardData } from "./ProductCard";

const PRODUCTS: ProductCardData[] = [
  {
    id: "1",
    name: "Hya Power — 1 kg Retail",
    category: "Home Garden",
    tagline: "Start Small",
    icon: "🌱",
    price: 9,
    priceNote: "From (1kg)",
    stockTons: 3.2,
    description:
      "Perfect for pots, seedlings, small gardens. Single scoop feeds a 2m² bed for a season.",
    features: ["16 nutrients", "Chemical-free", "Single application"],
    color: "#6FA82A",
  },
  {
    id: "2",
    name: "Hya Power — 10 kg Garden",
    category: "Small Farm",
    tagline: "Garden Scale",
    icon: "🌿",
    price: 95,
    priceNote: "Per 10kg bag",
    stockTons: 12,
    description:
      "Ideal for homesteads, food gardens, and smallholder plots. Feeds up to 100m² for a full season.",
    features: ["pH balancing", "Slow release", "No weeds"],
    color: "#4E7A1F",
  },
  {
    id: "3",
    name: "Hya Power — 50 kg Farm",
    category: "Commercial",
    tagline: "Farm Essentials",
    icon: "🌾",
    price: 425,
    priceNote: "Per 50kg bag",
    stockTons: 28,
    description:
      "The workhorse size for commercial farms. Feeds half a hectare at recommended application rates.",
    features: ["ECOCERT inspected", "16 nutrients", "Soil bonding"],
    color: "#8D5B2A",
  },
  {
    id: "4",
    name: "Hya Power — 100 kg Bulk",
    category: "Commercial",
    tagline: "Higher Volume",
    icon: "📦",
    price: 810,
    priceNote: "Per 100kg",
    stockTons: 22,
    description:
      "For larger operations and cooperatives. Mixed application for full hectare coverage.",
    features: ["Bulk saving", "Full hectare", "Consistent blend"],
    color: "#A66A28",
  },
  {
    id: "5",
    name: "Hya Power — 1 Ton Bulk",
    category: "Bulk",
    tagline: "Best Value",
    icon: "🚚",
    price: 6095,
    priceNote: "Per 1 ton (bulk)",
    stockTons: 14,
    description:
      "The most economical option for farms and distributors. Delivered anywhere in South Africa.",
    features: ["Free delivery", "Co-op pricing", "Delivered in 7 days"],
    color: "#3D7A8F",
  },
  {
    id: "6",
    name: "Partnership — Custom",
    category: "Partnership",
    tagline: "For Distributors",
    icon: "🤝",
    price: 0,
    priceNote: "Bespoke pricing",
    stockTons: 0,
    description:
      "Distributors, co-ops and municipal partnerships. Volume contracts, private labeling available.",
    features: ["Volume contracts", "Private label", "Year-round supply"],
    color: "#6B4E9E",
  },
];

export default function ProductsSection() {
  return (
    <section
      id="products"
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
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
            Hya Power Organic Fertilizer
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
            One product.{" "}
            <span style={{ color: "var(--secondary)" }}>Every scale.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            From a single 1kg bag for home gardens to 1-ton bulk orders for
            commercial farms and co-ops — the same 100% organic, 16-nutrient
            fertilizer. Hover a card to see what makes it different.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 60,
            textAlign: "center",
            padding: "24px",
            background: "var(--surface-2)",
            borderRadius: 16,
            maxWidth: 720,
            margin: "60px auto 0",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            🚚 <strong style={{ color: "var(--text)" }}>Free delivery</strong> on
            bulk orders over 1 ton · 📞{" "}
            <strong style={{ color: "var(--text)" }}>Custom quotes</strong> for
            co-ops and distributors · 🌿{" "}
            <strong style={{ color: "var(--text)" }}>ECOCERT inspected</strong>{" "}
            for certified organic use
          </div>
        </motion.div>
      </div>
    </section>
  );
}