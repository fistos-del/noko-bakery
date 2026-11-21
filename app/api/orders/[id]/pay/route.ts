import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { method } = await request.json();

    if (!["CARD", "EFT", "QR"].includes(method)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: params.id } });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (order.paymentStatus === "PAID") {
      return NextResponse.json({ error: "Already paid" }, { status: 400 });
    }

    // Simulate successful payment
    const updated = await prisma.order.update({
      where: { id: params.id },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
        paymentMethod: method,
      },
    });

    return NextResponse.json({ order: updated });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
