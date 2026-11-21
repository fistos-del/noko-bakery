import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentMethods from "@/components/PaymentMethods";

export default async function PayPage({ params }: { params: { orderId: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  if (order.paymentStatus === "PAID") {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Payment Complete</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
          Order #{order.orderNumber} is confirmed. We&apos;ll start baking soon!
        </p>
        <a href={`/track/${order.id}`} style={{ display: "inline-block", padding: "14px 28px", background: "var(--brand-plum)", color: "white", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
          Track Order
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "100px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Complete Payment</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
        Order #{order.orderNumber} · Total R {order.total.toFixed(2)}
      </p>
      <PaymentMethods orderId={order.id} total={order.total} />
    </div>
  );
}
