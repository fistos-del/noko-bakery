import { getCurrentUserWithAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user) redirect("/login");

  let orders: any[] = [];
  let activeSubs = 0;
  let products = 0;
  let revenue = 0;

  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [fetchedOrders, fetchedSubs, fetchedProducts] = await Promise.all([
      prisma.order.findMany({ where: { createdAt: { gte: weekAgo } }, orderBy: { createdAt: "desc" }, include: { items: true } }),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.product.count(),
    ]);

    orders = fetchedOrders;
    activeSubs = fetchedSubs;
    products = fetchedProducts;
    revenue = orders.reduce((sum, o) => sum + o.total, 0);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F9FA", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* JOBGIO SIDEBAR */}
      <aside style={{ width: 260, background: "#FFFFFF", borderRight: "1px solid #E5E7EB", padding: "32px 24px", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 110 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{ width: 32, height: 32, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#FFF", fontSize: 16 }}>🌱</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>Noko<span style={{ color: "#FF4500" }}>.</span></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Link href="/account" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#F3F4F6", borderRadius: 10, color: "#111827", fontWeight: 700, fontSize: 14 }}>
            <span style={{ fontSize: 16 }}>🏠</span> Dashboard
          </Link>
          <Link href="/admin/orders" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", color: "#6B7280", fontWeight: 500, fontSize: 14 }}>
            <span style={{ fontSize: 16 }}>📋</span> Orders
          </Link>
          <Link href="/admin/products" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", color: "#6B7280", fontWeight: 500, fontSize: 14 }}>
            <span style={{ fontSize: 16 }}>🥖</span> Products
          </Link>
          <Link href="/admin/customers" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", color: "#6B7280", fontWeight: 500, fontSize: 14 }}>
            <span style={{ fontSize: 16 }}>👥</span> Customers
          </Link>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FF4500", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
              {user.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{user.email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: 260, flex: 1, padding: "40px 48px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 4 }}>Dashboard</h1>
            <p style={{ fontSize: 14, color: "#6B7280" }}>Welcome back, {user.name.split(" ")[0]}. Here is your store overview.</p>
          </div>
          <LogoutButton />
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Quick Stats</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          <StatCard title="Weekly Revenue" value={`R ${revenue.toLocaleString()}`} icon="💰" />
          <StatCard title="Total Orders" value={orders.length.toString()} icon="📦" />
          <StatCard title="Active Subs" value={activeSubs.toString()} icon="🔄" />
          <StatCard title="Products Live" value={products.toString()} icon="🥖" />
          <StatCard title="Pending Orders" value="0" icon="⏳" />
          <StatCard title="Reported Issues" value="0" icon="⚠️" />
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 16, border: "1px solid #E5E7EB", padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Manage Jobs (Orders)</h2>
            <Link href="/admin/orders" style={{ padding: "8px 16px", background: "#111827", color: "#FFF", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>View All</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E7EB", textAlign: "left", color: "#6B7280" }}>
                <th style={{ padding: "12px 0", fontWeight: 600 }}>Order Title</th>
                <th style={{ padding: "12px 0", fontWeight: 600 }}>Customer</th>
                <th style={{ padding: "12px 0", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 0", fontWeight: 600 }}>Posted Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: "20px 0", textAlign: "center", color: "#6B7280" }}>No orders yet.</td></tr>
              ) : (
                orders.slice(0, 3).map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td style={{ padding: "16px 0", fontWeight: 700, color: "#111827" }}>Order #{order.orderNumber}</td>
                    <td style={{ padding: "16px 0", color: "#6B7280" }}>{order.guestName || "Guest"}</td>
                    <td style={{ padding: "16px 0" }}>
                      <span style={{ padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 700, background: order.status === 'PENDING' ? '#FEF3C7' : '#DBEAFE', color: order.status === 'PENDING' ? '#D97706' : '#2563EB' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 0", color: "#6B7280" }}>{new Date(order.createdAt).toLocaleDateString("en-ZA")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: string }) {
  return (
    <div style={{ background: "#FFFFFF", padding: 24, borderRadius: 16, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{title}</div>
    </div>
  );
}
