import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
        await prisma.discountCode.update({
          where: { id: code.id },
          data: { usesUsed: code.usesUsed + 1 },
        });
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
        paymentStatus: "PAID",
        notes: notes || null,
        deliveryDate: new Date(Date.now() + 2 * 86400000),
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
