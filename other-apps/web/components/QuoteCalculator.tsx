"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CROPS = [
  { name: "Organic Maize", rateLow: 400, rateHigh: 500, note: "Heavy feeder — use high rate" },
  { name: "Organic Wheat", rateLow: 300, rateHigh: 400, note: "Medium feeder" },
  { name: "Organic Vegetables", rateLow: 350, rateHigh: 500, note: "Intensive — use high rate" },
  { name: "Organic Vineyards", rateLow: 250, rateHigh: 400, note: "Moderate — avoid overfeeding" },
  { name: "Organic Citrus", rateLow: 300, rateHigh: 450, note: "Balanced application" },
  { name: "Pasture", rateLow: 250, rateHigh: 350, note: "Light — repeat if depleted" },
  { name: "Sugarcane", rateLow: 400, rateHigh: 500, note: "Heavy feeder — high rate" },
  { name: "Flowers & Shrubs", rateLow: 250, rateHigh: 350, note: "Light — split if needed" },
];

const REGIONS = [
  "Free State",
  "Western Cape",
  "KwaZulu-Natal",
  "Gauteng",
  "Mpumalanga",
  "Limpopo",
  "North West",
  "Eastern Cape",
  "Northern Cape",
];

// Retail/bulk price per kg based on tier
const PRICE_TIERS = [
  { minKg: 0, maxKg: 5, pricePerKg: 9, label: "Retail (1-5kg)" },
  { minKg: 5, maxKg: 30, pricePerKg: 8.5, label: "Garden (5-30kg)" },
  { minKg: 30, maxKg: 100, pricePerKg: 8, label: "Farm (30-100kg)" },
  { minKg: 100, maxKg: 500, pricePerKg: 7.5, label: "Bulk (100-500kg)" },
  { minKg: 500, maxKg: 5000, pricePerKg: 7, label: "Co-op (500kg+)" },
  { minKg: 5000, maxKg: Infinity, pricePerKg: 6.095, label: "Distributor (5t+)" },
];

function getPricePerKg(kg: number) {
  const tier = PRICE_TIERS.find((t) => kg >= t.minKg && kg < t.maxKg);
  return tier ?? PRICE_TIERS[0];
}

export default function QuoteCalculator() {
  const [cropIndex, setCropIndex] = useState(0);
  const [hectares, setHectares] = useState(50);
  const [region, setRegion] = useState("Free State");
  const [rateMode, setRateMode] = useState<"low" | "high">("high");

  const crop = CROPS[cropIndex];
  const ratePerHa = rateMode === "low" ? crop.rateLow : crop.rateHigh;
  const totalKg = hectares * ratePerHa;
  const totalTons = totalKg / 1000;
  const tier = getPricePerKg(totalKg);
  const pricePerKg = tier.pricePerKg;
  const totalPrice = totalKg * pricePerKg;

  // Recommend packaging
  const packaging = recommendPackaging(totalKg);

  return (
    <section
      id="quote"
      style={{ padding: "120px 40px", background: "var(--bg-alt)" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 60 }}
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
            Bulk Quote Calculator
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Get an instant{" "}
            <span style={{ color: "var(--secondary)" }}>Hya Power</span> quote
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Tell us your crop and area. We&apos;ll calculate exactly how much
            Hya Power you need — and which packaging sizes to order.
          </p>
        </motion.div>

        <motion.div
          className="quote-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 40,
            boxShadow: "0 12px 40px rgba(31, 36, 32, 0.06)",
          }}
        >
          {/* Input fields */}
          <div
            className="quote-fields-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "var(--text-soft)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  fontWeight: 800,
                }}
              >
                Crop Type
              </label>
              <select
                value={cropIndex}
                onChange={(e) => setCropIndex(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {CROPS.map((c, i) => (
                  <option key={c.name} value={i}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "var(--text-soft)",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  fontWeight: 800,
                }}
              >
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hectares slider */}
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--text-soft)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                fontWeight: 800,
              }}
            >
              <span>Area to fertilize</span>
              <span
                style={{
                  color: "var(--primary-dark)",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: 0,
                  textTransform: "none",
                }}
              >
                {hectares} {hectares === 1 ? "hectare" : "hectares"}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={2000}
              step={1}
              value={hectares}
              onChange={(e) => setHectares(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--primary)",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--text-soft)",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              <span>1 ha</span>
              <span>2,000 ha</span>
            </div>
          </div>

          {/* Application rate toggle */}
          <div style={{ marginBottom: 32 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                color: "var(--text-soft)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                fontWeight: 800,
              }}
            >
              Application Rate
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <button
                onClick={() => setRateMode("low")}
                style={{
                  padding: "14px 16px",
                  background:
                    rateMode === "low" ? "var(--primary-soft)" : "white",
                  border: `1px solid ${
                    rateMode === "low" ? "var(--primary)" : "var(--border)"
                  }`,
                  borderRadius: 10,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color:
                      rateMode === "low"
                        ? "var(--primary-dark)"
                        : "var(--text)",
                    marginBottom: 2,
                  }}
                >
                  {crop.rateLow} kg/ha
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  Moderate — healthy soil
                </div>
              </button>
              <button
                onClick={() => setRateMode("high")}
                style={{
                  padding: "14px 16px",
                  background:
                    rateMode === "high" ? "var(--primary-soft)" : "white",
                  border: `1px solid ${
                    rateMode === "high" ? "var(--primary)" : "var(--border)"
                  }`,
                  borderRadius: 10,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color:
                      rateMode === "high"
                        ? "var(--primary-dark)"
                        : "var(--text)",
                    marginBottom: 2,
                  }}
                >
                  {crop.rateHigh} kg/ha
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  High — depleted soil
                </div>
              </button>
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "var(--secondary)",
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              💡 {crop.note}
            </div>
          </div>

          {/* Results */}
          <div
            style={{
              padding: 28,
              background: "var(--bg-alt)",
              borderRadius: 14,
              border: "1px solid var(--border)",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--text-soft)",
                marginBottom: 20,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontWeight: 800,
              }}
            >
              Your Hya Power Recommendation
            </div>

            {/* Main stat */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Total Hya Power needed
              </div>
              <div
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "var(--primary-dark)",
                  letterSpacing: -1.5,
                  lineHeight: 1,
                }}
              >
                {totalKg.toLocaleString()} kg
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-soft)",
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                ≈ {totalTons.toFixed(2)} tons for {hectares} ha
              </div>
            </div>

            {/* Grid of details */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 20,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text-soft)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  Application Rate
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {ratePerHa} kg/ha
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text-soft)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  Tier
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {tier.label}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text-soft)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  Price / kg
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  R {pricePerKg.toFixed(2)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text-soft)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  Estimated Total
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--secondary)",
                  }}
                >
                  R {totalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {/* Packaging recommendation */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                📦 Recommended packaging
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {packaging.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "6px 12px",
                      background: "var(--primary-soft)",
                      color: "var(--primary-dark)",
                      borderRadius: 100,
                      letterSpacing: 0.3,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: "18px",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(111, 168, 42, 0.28)",
              transition: "transform 0.2s",
            }}
          >
            Request Formal Quote for {region} Delivery →
          </button>

          <div
            style={{
              marginTop: 16,
              textAlign: "center",
              fontSize: 12,
              color: "var(--text-soft)",
              fontWeight: 500,
            }}
          >
            Or call us directly:{" "}
            <strong style={{ color: "var(--primary-dark)" }}>
              081 147 5703
            </strong>{" "}
            · Free delivery on orders over 1 ton
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .quote-fields-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .quote-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

function recommendPackaging(totalKg: number): string[] {
  const parts: string[] = [];
  let remaining = totalKg;

  // Recommend biggest bags first
  const oneTon = 1000;
  const hundred = 100;
  const fifty = 50;
  const ten = 10;

  if (remaining >= oneTon) {
    const tons = Math.floor(remaining / oneTon);
    parts.push(`${tons} × 1 ton${tons > 1 ? "s" : ""}`);
    remaining -= tons * oneTon;
  }
  if (remaining >= hundred) {
    const hundreds = Math.floor(remaining / hundred);
    parts.push(`${hundreds} × 100kg`);
    remaining -= hundreds * hundred;
  }
  if (remaining >= fifty) {
    const fifties = Math.floor(remaining / fifty);
    parts.push(`${fifties} × 50kg`);
    remaining -= fifties * fifty;
  }
  if (remaining >= ten && remaining < 50) {
    const tens = Math.ceil(remaining / ten);
    parts.push(`${tens} × 10kg`);
    remaining -= tens * ten;
  }
  if (remaining > 0 && remaining < 10) {
    parts.push("1 × small bag (custom)");
  }

  if (parts.length === 0) parts.push("1 × 1kg (starter)");

  return parts;
}