import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta("Deliveries", "Scheduled and in-progress deliveries");
import { prisma } from "@/lib/prisma";
import Card from "@/components/Card";
import { formatDate } from "@/lib/stock";

export const dynamic = "force-dynamic";

export default async function DeliveriesPage() {
  const orders = await prisma.order.findMany({
    where: {
      status: { in: ["CONFIRMED", "READY", "OUT_FOR_DELIVERY"] },
    },
    include: { customer: true, items: true },
    orderBy: { deliveryDate: "asc" },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Deliveries</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
          Scheduled and in-progress deliveries
        </p>
      </div>

      <Card title="🚚 Delivery Schedule">
        {orders.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            No active deliveries.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {orders.map((o) => {
              const totalTons = o.items.reduce(
                (s, i) => s + i.quantityTons,
                0
              );
              return (
                <div
                  key={o.id}
                  style={{
                    padding: 16,
                    background: "var(--surface-2)",
                    borderRadius: 8,
                    borderLeft: `3px solid ${
                      o.status === "OUT_FOR_DELIVERY" ? "#F97316" : "#3B82F6"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>
                        {o.orderNumber} · {o.customer.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          marginTop: 4,
                        }}
                      >
                        📍 {o.deliveryAddress}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        📦 {totalTons}t ·{" "}
                        {o.items.map((i) => i.productName).join(", ")}
                      </div>
                      {o.notes && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--accent)",
                            marginTop: 6,
                          }}
                        >
                          ⚠️ {o.notes}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {formatDate(o.deliveryDate)}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          marginTop: 6,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "#F9731622",
                          color: "#F97316",
                          display: "inline-block",
                          fontWeight: 600,
                        }}
                      >
                        {o.status.replace(/_/g, " ")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}