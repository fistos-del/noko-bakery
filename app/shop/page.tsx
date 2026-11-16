import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductCard from "@/components/ProductCard"; // If this is missing, use MagneticCard

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: "var(--brand-plum)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 900, marginBottom: 16 }}>
            Our Menu
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20, color: "var(--brand-plum)" }}>
            Everything we bake
          </h1>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", opacity: 0.9, maxWidth: 600, lineHeight: 1.7 }}>
            Fresh from the oven, delivered to your door. Every box is curated by hand.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {products.map((product) => {
            // Fallback to a simple card if ProductCard is missing
            return (
              <Link key={product.id} href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
                 <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 10px 30px rgba(100,28,64,0.1)", height: "100%" }}>
                    <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🥖</div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--brand-plum)", marginBottom: 10 }}>{product.name}</h2>
                    <p style={{ fontSize: 13, color: "var(--brand-plum)", opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>{product.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 22, fontWeight: 900, color: "var(--brand-plum)" }}>R {product.price}</span>
                      <span style={{ padding: "8px 16px", background: "var(--brand-plum)", color: "white", borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>View</span>
                    </div>
                 </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
