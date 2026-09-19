import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, productId, quantityTons, deliveryDate, deliveryAddress, notes } = body;

    // Validate required fields
    if (!customerId || !productId || !quantityTons || !deliveryDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const quantity = Number(quantityTons);
    if (quantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    // Fetch product to check stock and get price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.stockTons < quantity) {
      return NextResponse.json(
        {
          error: `Insufficient stock. Only ${product.stockTons}t available.`,
        },
        { status: 400 }
      );
    }

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `HYP-2025-${String(orderCount + 45).padStart(4, "0")}`;

    const subtotal = quantity * product.pricePerTon;

    // Create order + deduct stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          status: "PENDING",
          deliveryDate: new Date(deliveryDate),
          deliveryAddress: deliveryAddress || "",
          notes: notes || "",
          totalValue: subtotal,
          items: {
            create: [
              {
                productId: product.id,
                productName: product.name,
                quantityTons: quantity,
                pricePerTon: product.pricePerTon,
                subtotal,
              },
            ],
          },
        },
        include: { customer: true, items: true },
      });

      await tx.product.update({
        where: { id: product.id },
        data: { stockTons: product.stockTons - quantity },
      });

      return newOrder;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}