import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        type: order.type,
        total: order.total,
        address: order.address,
        createdAt: order.createdAt,
        items: order.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        })),
      },
    });
  } catch (error) {
    console.error("Order tracking error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      name,
      email,
      phone,
      type,
      address,
      notes,
      paymentMethod,
      discountCode,
      deliveryDate,
    } = body;

    // Validate
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 },
      );
    }
    if (!["DELIVERY", "COLLECTION"].includes(type)) {
      return NextResponse.json({ error: "Invalid order type" }, { status: 400 });
    }
    if (!["CARD", "EFT", "QR"].includes(paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }
    if (type === "DELIVERY" && (!deliveryDate || Number.isNaN(new Date(deliveryDate).getTime()))) {
      return NextResponse.json({ error: "A valid delivery date is required" }, { status: 400 });
    }
    const parsedDeliveryDate =
      type === "DELIVERY" ? new Date(deliveryDate) : null;

    if (type === "DELIVERY" && !address) {
      return NextResponse.json(
        { error: "Address is required for delivery" },
        { status: 400 },
      );
    }

    // Fetch products
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: "One or more products not found" },
        { status: 400 },
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)!;
      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;
      return {
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal: itemSubtotal,
      };
    });

    const deliveryFee = type === "DELIVERY" ? 25 : 0;

    // Discount
    let discount = 0;
    if (discountCode) {
      const code = await prisma.discountCode.findUnique({
        where: { code: discountCode.toUpperCase() },
      });
      if (
        code &&
        code.active &&
        code.usesUsed < code.maxUses &&
        (!code.expiresAt || code.expiresAt > new Date())
      ) {
        discount = (subtotal * code.percentOff) / 100;
      }
    }

    const total = subtotal + deliveryFee - discount;

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `NOKO-${String(orderCount + 1001).padStart(4, "0")}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        type,
        address: type === "DELIVERY" ? address : null,
        status: "PENDING",
        subtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        paymentStatus: "PENDING",
        notes: notes || null,
        deliveryDate: parsedDeliveryDate,
        items: { create: orderItems },
      },
    });

    return NextResponse.json(
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        discountApplied: discount > 0 ? discountCode : null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: String(error) },
      { status: 500 },
    );
  }
}
