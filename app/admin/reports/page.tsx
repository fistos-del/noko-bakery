import { prisma } from "@/lib/prisma";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  const [orders, subs, customers, products] = await Promise.all([
    prisma.order.findMany({ select: { total: true, status: true, createdAt: true } }),
    prisma.subscription.findMany({ select: { status: true, pricePerWeek: true } }),
    prisma.customer.count(),
    prisma.product.count(),
  ]);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const activeSubs = subs.filter(s => s.status === "ACTIVE").length;
  const weeklyRecurring = subs.filter(s => s.status === "ACTIVE").reduce((sum, s) => sum + s.pricePerWeek, 0);

  const last30 = orders.filter(o => new Date(o.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const last30Revenue = last30.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111" }}>Reports</h1>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          Business snapshot — last updated {new Date().toLocaleString("en-ZA")}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
        <Stat title="TOTAL REVENUE" value={`R ${revenue.toLocaleString()}`} />
        <Stat title="REVENUE (30 DAYS)" value={`R ${last30Revenue.toLocaleString()}`} />
        <Stat title="TOTAL ORDERS" value={orders.length.toString()} />
        <Stat title="ACTIVE SUBSCRIPTIONS" value={activeSubs.toString()} />
        <Stat title="WEEKLY RECURRING" value={`R ${weeklyRecurring.toLocaleString()}`} />
        <Stat title="CUSTOMERS" value={customers.toString()} />
        <Stat title="PRODUCTS" value={products.toString()} />
      </div>

      <div style={{ background: "#FFF", borderRadius: 16, padding: 32, border: "1px solid #EEE" }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, color: "#111", marginBottom: 16 }}>Orders by Status</h2>
        {["PENDING", "CONFIRMED", "BAKING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"].map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F5F5F5", fontSize: 14 }}>
              <span style={{ color: "#666" }}>{status}</span>
              <span style={{ fontWeight: 700, color: "#111" }}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string, value: string }) {
  return (
    <div style={{ background: "#FFF", padding: 24, borderRadius: 16, border: "1px solid #EEE" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#666", letterSpacing: 1, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: -1 }}>{value}</div>
    </div>
  );
}
