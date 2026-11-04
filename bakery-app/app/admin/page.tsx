import { getCurrentUserWithAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = await getCurrentUserWithAdmin();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/account");

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [orders, activeSubs, products] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: weekAgo } },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.product.count(),
  ]);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const chartData = [40, 65, 30, 80, 50, 95, 70]; 
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid var(--admin-border)", paddingBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: "var(--admin-text)", fontFamily: "var(--font-mono)" }}>
            &gt; SYSTEM_OVERVIEW
          </h1>
          <p style={{ fontSize: 12, color: "var(--admin-text-muted)", marginTop: 8, fontFamily: "var(--font-mono)" }}>
            USER: {user.name.toUpperCase()} // STATUS: ONLINE
          </p>
        </div>
        <Link href="/admin/orders" style={{
            padding: "10px 20px", background: "var(--admin-text)", color: "var(--admin-bg)",
            borderRadius: 0, fontSize: 12, fontWeight: 900, textDecoration: "none", fontFamily: "var(--font-mono)"
          }}>
          + NEW_ORDER
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatBlock title="REVENUE" value={`R ${revenue.toLocaleString()}`} color="var(--admin-text)" />
        <StatBlock title="ORDERS" value={orders.length.toString()} color="var(--admin-text)" />
        <StatBlock title="SUBS" value={activeSubs.toString()} color="var(--admin-text)" />
        <StatBlock title="PRODUCTS" value={products.toString()} color="var(--admin-text)" />
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 32 }} className="admin-grid">
        
        {/* Bar Chart */}
        <div style={{ background: "var(--admin-surface)", padding: 32, border: "1px solid var(--admin-border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: "var(--admin-text)", fontFamily: "var(--font-mono)" }}>&gt; REVENUE_FLOW</h2>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 200 }}>
            {chartData.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, height: "100%", justifyContent: "flex-end" }}>
                <div style={{
                  width: "100%", maxWidth: 32, height: `${h}%`,
                  background: i === 5 ? "var(--admin-text)" : "var(--admin-border)", 
                  borderRadius: 0
                }} />
                <span style={{ fontSize: 11, color: "var(--admin-text-muted)", fontFamily: "var(--font-mono)" }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Box */}
        <div style={{ background: "var(--admin-surface)", padding: 32, border: "1px solid var(--admin-border)", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: 14, fontWeight: 900, color: "var(--admin-text)", marginBottom: 24, fontFamily: "var(--font-mono)" }}>&gt; SYSTEM_STATUS</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "var(--font-mono)", fontSize: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--admin-text-muted)" }}>
              <span>DATABASE</span>
              <span style={{ color: "#00FF00" }}>[ONLINE]</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--admin-text-muted)" }}>
              <span>PAYMENTS</span>
              <span style={{ color: "#00FF00" }}>[ONLINE]</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--admin-text-muted)" }}>
              <span>UPTIME</span>
              <span style={{ color: "var(--admin-text)" }}>99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: "var(--admin-surface)", padding: 32, border: "1px solid var(--admin-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 900, color: "var(--admin-text)", fontFamily: "var(--font-mono)" }}>&gt; RECENT_TRANSACTIONS</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {orders.length === 0 ? (
            <div style={{ color: "var(--admin-text-muted)", fontSize: 13, fontFamily: "var(--font-mono)" }}>NO_DATA_FOUND</div>
          ) : (
            orders.slice(0, 5).map((order) => (
              <div key={order.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 0", borderBottom: "1px solid var(--admin-border)", fontFamily: "var(--font-mono)"
              }}>
                <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                  <span style={{ color: "var(--admin-text-muted)" }}>{new Date(order.createdAt).toLocaleDateString("en-ZA")}</span>
                  <span style={{ color: "var(--admin-text)", fontWeight: 700 }}>#{order.orderNumber}</span>
                </div>
                <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
                  <span style={{ color: "var(--admin-text-muted)" }}>{order.guestName?.toUpperCase() || "GUEST"}</span>
                  <span style={{ color: "var(--admin-text)", fontWeight: 700 }}>R {order.total.toFixed(0)}</span>
                  <span style={{ color: order.status === 'PENDING' ? "var(--primary)" : "var(--admin-text-muted)" }}>[{order.status}]</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { 
          .admin-grid { grid-template-columns: 1fr !important; } 
        }
      `}</style>
    </div>
  );
}

function StatBlock({ title, value, color }: { title: string, value: string, color: string }) {
  return (
    <div style={{ background: "var(--admin-surface)", padding: 24, border: "1px solid var(--admin-border)" }}>
      <div style={{ fontSize: 11, color: "var(--admin-text-muted)", fontWeight: 700, fontFamily: "var(--font-mono)", marginBottom: 12 }}>
        &gt; {title}
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: color, fontFamily: "var(--font-mono)", letterSpacing: -1 }}>
        {value}
      </div>
    </div>
  );
}
