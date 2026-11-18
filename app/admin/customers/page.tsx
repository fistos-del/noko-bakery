import { prisma } from "@/lib/prisma";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orders: true, subscriptions: true },
      },
    },
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111" }}>Customers</h1>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          View all registered customers ({customers.length} total).
        </p>
      </div>

      {customers.length === 0 ? (
        <div style={{ padding: 40, background: "#FFF", borderRadius: 16, textAlign: "center", color: "#888", border: "1px dashed #CCC" }}>
          No customers yet.
        </div>
      ) : (
        <div style={{ background: "#FFF", borderRadius: 16, overflow: "hidden", border: "1px solid #EEE" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, padding: "16px 24px", background: "#FAFAFA", borderBottom: "1px solid #EEE", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#666" }}>
            <div>Customer</div>
            <div>Orders</div>
            <div>Subscriptions</div>
            <div>Joined</div>
          </div>

          {customers.map((c) => (
            <div
              key={c.id}
              style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, padding: "16px 24px", borderTop: "1px solid #F5F5F5", fontSize: 14, alignItems: "center" }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#111" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{c.email}</div>
                {c.isAdmin && (
                  <span style={{ display: "inline-block", marginTop: 4, fontSize: 10, fontWeight: 800, padding: "2px 6px", background: "#641C40", color: "white", borderRadius: 3, letterSpacing: 1 }}>ADMIN</span>
                )}
              </div>
              <div style={{ color: "#111", fontWeight: 600 }}>{c._count.orders}</div>
              <div style={{ color: "#111", fontWeight: 600 }}>{c._count.subscriptions}</div>
              <div style={{ color: "#666", fontSize: 12 }}>{new Date(c.createdAt).toLocaleDateString("en-ZA")}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
