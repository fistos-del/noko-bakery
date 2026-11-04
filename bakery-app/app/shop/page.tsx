import { prisma } from "@/lib/prisma";
import Link from "next/link";
import MagneticCard from "@/components/MagneticCard";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ marginBottom: 60 }}>
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
          Our Menu
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Everything we bake
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-muted)",
            maxWidth: 600,
            lineHeight: 1.7,
          }}
        >
          Fresh from the oven, delivered to your door. Every box is curated by
          hand.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {products.map((product) => {
          const contents: string[] = JSON.parse(product.contents);
          return (
            <MagneticCard key={product.id}>
              <Link
                href={`/shop/${product.slug}`}
                style={{
                  display: "block",
                  padding: 32,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  🥖
                </div>
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    marginBottom: 12,
                    letterSpacing: -0.5,
                  }}
                >
                  {product.name}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: 20,
                    minHeight: 60,
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    paddingTop: 20,
                    borderTop: "1px solid var(--border-dark)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-soft)",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      fontWeight: 800,
                      marginBottom: 10,
                    }}
                  >
                    Contains
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      fontSize: 12,
                      color: "var(--text-muted)",
                      lineHeight: 1.8,
                      marginBottom: 20,
                    }}
                  >
                    {contents.map((item, i) => (
                      <li key={i}>· {item}</li>
                    ))}
                  </ul>
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
                      fontSize: 24,
                      fontWeight: 900,
                      color: "var(--primary-light)",
                      letterSpacing: -0.5,
                    }}
                  >
                    R {product.price}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    View →
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    fontSize: 11,
                    color: "var(--text-soft)",
                  }}
                >
                  Allergens: {product.allergens}
                </div>
              </Link>
            </MagneticCard>
          );
        })}
      </div>
    </div>
  );
}
