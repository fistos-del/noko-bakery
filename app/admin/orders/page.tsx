import { getCurrentUserWithAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminOrderRow from "@/components/AdminOrderRow";
import OrdersFilters from "@/components/OrdersFilters";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string; payment?: string; q?: string };
}) {
  const user = await getCurrentUserWithAdmin();
  if (!user) redirect("/login");
  if (!user.isAdmin) redirect("/account");

  const where: any = {};
  if (searchParams.status && searchParams.status !== "ALL") where.status = searchParams.status;
  if (searchParams.payment && searchParams.payment !== "ALL") where.paymentStatus = searchParams.payment;
  if (searchParams.q) {
    where.OR = [
      { orderNumber: { contains: searchParams.q, mode: "insensitive" } },
      { guestName: { contains: searchParams.q, mode: "insensitive" } },
      { guestEmail: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  const allOrders = await prisma.order.findMany({ select: { status: true, paymentStatus: true } });
  const pending = allOrders.filter((o) => ["PENDING", "CONFIRMED", "BAKING"].includes(o.status)).length;
  const unpaid = allOrders.filter((o) => o.paymentStatus !== "PAID" && o.status !== "CANCELLED").length;
  const completed = allOrders.filter((o) => o.status === "DELIVERED").length;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <Link href="/admin" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: 1, fontWeight: 700 }}>← Back to dashboard</Link>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: -1.5, marginTop: 16, marginBottom: 8 }}>Orders</h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          {allOrders.length} total · {pending} to bake · {unpaid} unpaid · {completed} delivered
        </p>
      </div>

      <OrdersFilters currentStatus={searchParams.status || "ALL"} currentPayment={searchParams.payment || "ALL"} currentQuery={searchParams.q || ""} />

      {orders.length === 0 ? (
        <div style={{ padding: 60, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, textAlign: "center", marginTop: 24 }}>
          <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.5 }}>📋</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>No orders match your filters</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Try clearing the filters above</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          {orders.map((order) => (
            <AdminOrderRow
              key={order.id}
              order={{
                id: order.id,
                orderNumber: order.orderNumber,
                status: order.status,
                paymentStatus: order.paymentStatus,
                paymentMethod: order.paymentMethod,
                guestName: order.guestName,
                guestEmail: order.guestEmail,
                guestPhone: order.guestPhone,
                type: order.type,
                address: order.address,
                total: order.total,
                createdAt: order.createdAt.toISOString(),
                items: order.items.map((i) => ({ name: i.product.name, quantity: i.quantity, subtotal: i.subtotal })),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
