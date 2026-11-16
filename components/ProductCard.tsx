"use client";

import { useState } from "react";
import Link from "next/link";

type Tier = { qty: number; price: number };

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  contents: string;
  allergens: string;
  imageUrl: string;
};

function parseTiers(contents: string): Tier[] | null {
  try {
    const parsed = JSON.parse(contents);
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0] === "object" &&
      "qty" in parsed[0] &&
      "price" in parsed[0]
    ) {
      return parsed as Tier[];
    }
  } catch {}
  return null;
}

function parseList(contents: string): string[] {
  try {
    const parsed = JSON.parse(contents);
    if (Array.isArray(parsed) && typeof parsed[0] === "string") {
      return parsed as string[];
    }
  } catch {}
  return [];
}

function emojiFor(category: string): string {
  if (category === "BAGEL") return "🥯";
  if (category === "PASTRY") return "🥐";
  return "🥖";
}

export default function ProductCard({ product }: { product: Product }) {
  const tiers = parseTiers(product.contents);
  const list = tiers ? [] : parseList(product.contents);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(
    tiers ? tiers[0] : null
  );

  const displayPrice = selectedTier ? selectedTier.price : product.price;
  const emoji = emojiFor(product.category);
  const useImage = product.imageUrl.startsWith("http");

  return (
    <div
      style={{
        background: "var(--pink-card)",
        border: "1px solid var(--pink-glow)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 10px 30px var(--pink-glow)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 96,
          background: "rgba(255,255,255,0.5)",
          borderBottom: "1px solid var(--pink-glow)",
          overflow: "hidden",
        }}
      >
        {useImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          emoji
        )}
      </div>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "var(--plum)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {product.name}
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "#6b4257",
            lineHeight: 1.6,
            marginBottom: 16,
            flex: 1,
          }}
        >
          {product.description}
        </p>

        {tiers && (
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 10,
                color: "var(--plum)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              Choose Pack
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tiers.map((t) => (
                <button
                  key={t.qty}
                  onClick={() => setSelectedTier(t)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    border:
                      selectedTier?.qty === t.qty
                        ? "2px solid var(--plum)"
                        : "1px solid var(--pink-glow)",
                    background:
                      selectedTier?.qty === t.qty
                        ? "var(--plum)"
                        : "transparent",
                    color:
                      selectedTier?.qty === t.qty
                        ? "var(--pink-soft)"
                        : "var(--plum)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  x{t.qty}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            paddingTop: 12,
            borderTop: "1px solid var(--pink-glow)",
            marginBottom: 12,
            fontSize: 11,
            color: "#6b4257",
          }}
        >
          Allergens: {product.allergens}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "var(--plum)",
            }}
          >
            R {displayPrice}
          </span>
          <Link
            href={`/shop/${product.slug}`}
            style={{
              padding: "8px 16px",
              background: "var(--plum)",
              color: "var(--pink-soft)",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            View
          </Link>
        </div>

        {list.length > 0 && (
          <div style={{ marginTop: 10, fontSize: 11, color: "#6b4257" }}>
            {list.slice(0, 3).join(" · ")}
          </div>
        )}
      </div>
    </div>
  );
}
