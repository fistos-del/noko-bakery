import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [rawMaterials, products, orders] = await Promise.all([
    prisma.rawMaterial.findMany(),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.order.findMany({
      include: { customer: true },
    }),
  ]);

  // ─────────────────────────────────────
  // 1. Production pipeline
  // ─────────────────────────────────────
  const hyacinthStock =
    rawMaterials.find((m) => m.name === "Water Hyacinth Biomass")?.currentTons ??
    0;

  const totalFinishedTons = products.reduce(
    (sum, p) => sum + p.stockTons,
    0
  );

  const shippedTons = orders
    .filter((o) => ["DELIVERED", "INVOICED", "PAID"].includes(o.status))
    .length; // just count for now — we don't have item-level aggregation

  const pipeline = [
    { stage: "Harvested", tons: hyacinthStock, color: "#3D7A8F" },
    {
      stage: "In Processing",
      tons: hyacinthStock * 0.4, // simulated
      color: "#C07F3E",
    },
    {
      stage: "Bagged Stock",
      tons: totalFinishedTons,
      color: "#8CC63F",
    },
    {
      stage: "Shipped",
      tons: totalFinishedTons * 0.65, // simulated
      color: "#2E4A2E",
    },
  ];

  // ─────────────────────────────────────
  // 2. Orders by status (funnel)
  // ─────────────────────────────────────
  const statuses = [
    "PENDING",
    "CONFIRMED",
    "READY",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "INVOICED",
    "PAID",
  ];

  const statusCounts = statuses.map((status) => ({
    status: status.replace(/_/g, " "),
    count: orders.filter((o) => o.status === status).length,
  }));

  // ─────────────────────────────────────
  // 3. Top customers by revenue
  // ─────────────────────────────────────
  const customerRevenue = new Map<string, { name: string; value: number }>();

  orders.forEach((order) => {
    const existing = customerRevenue.get(order.customerId);
    if (existing) {
      existing.value += order.totalValue;
    } else {
      customerRevenue.set(order.customerId, {
        name: order.customer.name,
        value: order.totalValue,
      });
    }
  });

  const topCustomers = Array.from(customerRevenue.values())
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // ─────────────────────────────────────
  // 4. Product stock (keep for reference)
  // ─────────────────────────────────────
  const productStock = products.map((p) => ({
    name: p.name.replace("Hya Power — ", ""),
    stock: p.stockTons,
    min: p.minStockTons,
  }));

  return NextResponse.json({
    pipeline,
    statusCounts,
    topCustomers,
    productStock,
  });
}