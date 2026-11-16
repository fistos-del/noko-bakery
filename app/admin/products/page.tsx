import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>Manage Products</h1>
          <p style={{ color: "#666", fontSize: 14 }}>Add, edit, or remove items from your bakery menu.</p>
        </div>
        <Link
          href="/admin/products/new"
          style={{ padding: "10px 20px", background: "#111", color: "#FFF", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div style={{ padding: 40, background: "#FFF", borderRadius: 16, textAlign: "center", color: "#888", border: "1px dashed #CCC" }}>
          <p style={{ fontSize: 14 }}>No products yet. Click &quot;+ Add Product&quot; to get started.</p>
        </div>
      ) : (
        <div style={{ background: "#FFF", borderRadius: 16, overflow: "hidden", border: "1px solid #EEE" }}>
          {products.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderTop: i === 0 ? "none" : "1px solid #EEE",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#111", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  R {p.price} &middot; {p.category} &middot; {p.inStock ? "In stock" : "Out of stock"}
                </div>
              </div>
              <Link
                href={`/admin/products/${p.id}`}
                style={{ padding: "8px 16px", background: "#F5F5F7", borderRadius: 6, fontSize: 13, fontWeight: 600, color: "#111", textDecoration: "none" }}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
