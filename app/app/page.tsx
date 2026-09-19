import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta("Dashboard", "Real-time overview of stock, orders, and alerts");
import { prisma } from "@/lib/prisma";
import Card from "@/components/Card";
import { stockStatus, formatZAR, formatDate } from "@/lib/stock";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [rawMaterials, products, orders] = await Promise.all([
    prisma.rawMaterial.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.order.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const criticalRaw = rawMaterials.filter((m) => m.currentTons < m.minTons);
  const lowRaw = rawMaterials.filter(
    (m) => m.currentTons >= m.minTons && m.currentTons < m.minTons * 1.5
  );
  const criticalProd = products.filter((p) => p.stockTons < p.minStockTons);
  const lowProd = products.filter(
    (p) => p.stockTons >= p.minStockTons && p.stockTons < p.minStockTons * 1.5
  );

  const totalAlerts =
    criticalRaw.length + lowRaw.length + criticalProd.length + lowProd.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
          Real-time overview of stock, orders, and alerts
        </p>
      </div>

            <div
        className="summary-cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
<SummaryCard
  label="Raw Materials"
  value={rawMaterials.length}
  sub={`${criticalRaw.length + lowRaw.length} need attention`}
  icon="🧪"
  delay={0}
/>
<SummaryCard
  label="Finished Goods"
  value={products.length}
  sub={`${criticalProd.length + lowProd.length} need attention`}
  icon="📦"
  delay={100}
/>
<SummaryCard
  label="Active Orders"
  value={
    orders.filter(
      (o) => o.status !== "PAID" && o.status !== "DELIVERED"
    ).length
  }
  sub={`${orders.length} total recent`}
  icon="📋"
  delay={200}
/>
<SummaryCard
  label="Stock Alerts"
  value={totalAlerts}
  sub={totalAlerts > 0 ? "Action required" : "All clear"}
  icon="🔔"
  danger={totalAlerts > 0}
  delay={300}
/>
      </div>

      {totalAlerts > 0 && (
        <Card title="🔴 Stock Alerts">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...criticalRaw, ...lowRaw, ...criticalProd, ...lowProd].map(
              (item) => {
                const isRaw = "currentTons" in item;
                const current = isRaw ? item.currentTons : item.stockTons;
                const min = isRaw ? item.minTons : item.minStockTons;
                const status = stockStatus(current, min);
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      background: "var(--surface-2)",
                      borderRadius: 8,
                      borderLeft: `3px solid ${status.color}`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>
                        {status.icon} {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        Current: {current}t · Minimum: {min}t ·{" "}
                        {isRaw ? "Raw Material" : "Finished Good"}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: status.color,
                        fontWeight: 600,
                      }}
                    >
                      {status.label}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Card>
      )}

      <Card
        title="📋 Recent Orders"
        action={
          <Link
            href="/orders"
            style={{ fontSize: 12, color: "var(--primary-light)" }}
          >
            View all →
          </Link>
        }
      >
                <div className="table-wrap">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <Th>Order #</Th>
                <Th>Customer</Th>
                <Th>Product</Th>
                <Th>Tons</Th>
                <Th>Value</Th>
                <Th>Delivery</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <Td>
                    <strong>{o.orderNumber}</strong>
                  </Td>
                  <Td>{o.customer.name}</Td>
                  <Td>{o.items[0]?.productName}</Td>
                  <Td>{o.items.reduce((s, i) => s + i.quantityTons, 0)}t</Td>
                  <Td>{formatZAR(o.totalValue)}</Td>
                  <Td>{formatDate(o.deliveryDate)}</Td>
                  <Td>
                    <StatusBadge status={o.status} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  icon,
  danger,
  delay = 0,
}: {
  label: string;
  value: number;
  sub: string;
  icon: string;
  danger?: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1px solid ${danger ? "var(--danger)" : "var(--border)"}`,
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 20 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
  <AnimatedNumber value={value} delay={delay} duration={1200} />
</div>
      <div
        style={{
          fontSize: 12,
          color: danger ? "var(--danger)" : "var(--text-muted)",
          marginTop: 4,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "8px 12px",
        color: "var(--text-muted)",
        fontWeight: 500,
        fontSize: 11,
        textTransform: "uppercase",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "10px 12px" }}>{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "#F59E0B",
    CONFIRMED: "#3B82F6",
    IN_PRODUCTION: "#8B5CF6",
    READY: "#06B6D4",
    OUT_FOR_DELIVERY: "#F97316",
    DELIVERED: "#10B981",
    INVOICED: "#6366F1",
    PAID: "#059669",
  };
  const color = colors[status] || "#666";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        background: `${color}22`,
        color,
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}