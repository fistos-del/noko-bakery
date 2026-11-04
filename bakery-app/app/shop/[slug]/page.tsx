import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import MagneticCard from "@/components/MagneticCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  console.log("=== PRODUCT DETAIL DEBUG ===");
  console.log("Requested slug:", params.slug);

  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  console.log("Found product:", product ? product.name : "NULL");

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      inStock: true,
      id: { not: product.id },
    },
    take: 2,
  });

  const contents: string[] = JSON.parse(product.contents);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 24px 80px",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--text-soft)",
          marginBottom: 32,
          letterSpacing: 1,
        }}
      >
        <Link href="/shop" style={{ color: "var(--accent)" }}>
          Shop
        </Link>{" "}
        / <span>{product.name}</span>
      </div>

      <div
        className="grid-stack-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
          marginBottom: 80,
        }}
      >
        <MagneticCard maxTilt={6}>
          <div
            style={{
              aspectRatio: "1",
              background:
                "radial-gradient(circle at 50% 40%, rgba(181, 56, 143, 0.15) 0%, var(--surface) 70%)",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 200,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
              🥖
            </div>
            {product.isSeasonal && (
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  padding: "6px 14px",
                  background: "var(--accent)",
                  color: "#2A1B2D",
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Seasonal
              </div>
            )}
          </div>
        </MagneticCard>

        <div>
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
            Artisan Box
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              padding: "24px 0",
              borderTop: "1px solid var(--border-dark)",
              borderBottom: "1px solid var(--border-dark)",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              What is inside
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 20px",
              }}
            >
              {contents.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "var(--text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "var(--primary-soft)",
                      color: "var(--primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-soft)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                Price
              </div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: "var(--primary-light)",
                  letterSpacing: -1.5,
                  lineHeight: 1,
                }}
              >
                R {product.price}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-soft)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 4,
                }}
              >
                Allergens
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                {product.allergens}
              </div>
            </div>
          </div>

          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={product.price}
            fullWidth
          />

          <div
            style={{
              marginTop: 20,
              fontSize: 12,
              color: "var(--text-soft)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            🚚 R25 flat delivery across Pretoria East
            <br />
            📍 Or collect at Mooikloof Glen Estate, 8–10am
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
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
            You might also like
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 900,
              letterSpacing: -1,
              marginBottom: 32,
            }}
          >
            More from the bakery
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {related.map((p) => {
              const relatedContents: string[] = JSON.parse(p.contents);
              return (
                <MagneticCard key={p.id} maxTilt={5}>
                  <Link
                    href={`/shop/${p.slug}`}
                    style={{
                      display: "block",
                      padding: 24,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 20,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 60,
                        textAlign: "center",
                        marginBottom: 16,
                      }}
                    >
                      🥐
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        marginBottom: 8,
                        letterSpacing: -0.3,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                        marginBottom: 16,
                      }}
                    >
                      {relatedContents.slice(0, 2).join(" · ")}
                      {relatedContents.length > 2 && " · ..."}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 12,
                        borderTop: "1px solid var(--border-dark)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 900,
                          color: "var(--primary-light)",
                        }}
                      >
                        R {p.price}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "var(--accent)",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        View →
                      </span>
                    </div>
                  </Link>
                </MagneticCard>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
