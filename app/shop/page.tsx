import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

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
            What we offer
          </h1>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", opacity: 0.9, maxWidth: 600, lineHeight: 1.7 }}>
            Fresh from the oven, delivered to your door. Every box is curated by hand.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 24 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
