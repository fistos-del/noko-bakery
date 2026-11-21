import { prisma } from "@/lib/prisma";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status, paymentStatus } = body;

    const data: { status?: string; paymentStatus?: string } = {};

    if (status) {
      const validStatuses = [
        "PENDING", "CONFIRMED", "BAKING", "READY",
        "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED",
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      data.status = status;
    }

    if (paymentStatus) {
      const validPayment = ["PENDING", "PAID", "FAILED", "REFUNDED"];
      if (!validPayment.includes(paymentStatus)) {
        return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
      }
      data.paymentStatus = paymentStatus;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
