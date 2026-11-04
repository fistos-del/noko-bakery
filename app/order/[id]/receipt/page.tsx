import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThermalReceipt from "@/components/ThermalReceipt";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function ReceiptPage({ params }: PageProps) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
        background:
          "radial-gradient(circle at 50% 40%, #3A2538 0%, #241625 100%)",
      }}
    >
      <ThermalReceipt
        orderNumber={order.orderNumber}
        items={order.items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          subtotal: i.subtotal,
        }))}
        subtotal={order.subtotal}
        deliveryFee={order.deliveryFee}
        discount={order.discount}
        total={order.total}
        type={order.type as "DELIVERY" | "COLLECTION"}
        address={order.address || undefined}
        paymentMethod={order.paymentMethod as "CARD" | "EFT" | "QR"}
        createdAt={order.createdAt}
      />

      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/track/${order.id}`}
          style={{
            padding: "14px 28px",
            background: "var(--primary)",
            color: "white",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          Track Order →
        </Link>
        <Link
          href="/shop"
          style={{
            padding: "14px 28px",
            background: "transparent",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
