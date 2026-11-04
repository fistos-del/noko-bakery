import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import TrackClient from "@/components/TrackClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function TrackPage({ params }: PageProps) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  const orderData = {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status as any,
    type: order.type as "DELIVERY" | "COLLECTION",
    total: order.total,
    address: order.address,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      subtotal: i.subtotal,
    })),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "100px 24px 80px",
        background:
          "radial-gradient(circle at 50% 20%, #3A2538 0%, #241625 60%)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", marginBottom: 32 }}>
        <Link
          href="/account"
          style={{
            fontSize: 12,
            color: "var(--accent)",
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          ← Back to account
        </Link>
      </div>

      <TrackClient initialOrder={orderData} />
    </div>
  );
}
