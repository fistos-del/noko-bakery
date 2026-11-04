import { getCurrentUserWithAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminOrderRow from "@/components/AdminOrderRow";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/account");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  const pending = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "BAKING"].includes(o.status)
  ).length;
  const inTransit = orders.filter(
    (o) => o.status === "OUT_FOR_DELIVERY" || o.status === "READY"
  ).length;
  const completed = orders.filter((o) => o.status === "DELIVERED").length;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 24px 80px" }}>
      <div style={{ marginBottom: 40 }}>
        <Link
          href="/admin"
          style={{
            fontSize: 12,
            color: "var(--accent)",
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          ← Back to dashboard
        </Link>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 900,
            letterSpacing: -1.5,
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          Orders
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          {orders.length} total orders · {pending} pending · {inTransit} in
          transit · {completed} delivered
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            padding: 60,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.5 }}>📋</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
            No orders yet
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Orders will appear here as customers place them
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {orders.map((order) => (
            <AdminOrderRow
              key={order.id}
              order={{
                id: order.id,
                orderNumber: order.orderNumber,
                status: order.status,
                guestName: order.guestName,
                guestEmail: order.guestEmail,
                guestPhone: order.guestPhone,
                type: order.type,
                address: order.address,
                total: order.total,
                createdAt: order.createdAt.toISOString(),
                items: order.items.map((i) => ({
                  name: i.product.name,
                  quantity: i.quantity,
                  subtotal: i.subtotal,
                })),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
