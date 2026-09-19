import { pageMeta } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { formatZAR, formatDate } from "@/lib/stock";
import OrdersClient from "./OrdersClient";

export const metadata = pageMeta("Orders", "All customer orders");

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const [orders, customers, products] = await Promise.all([
    prisma.order.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.customer.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  // Pass only the fields the client needs
  const customersForForm = customers.map((c) => ({
    id: c.id,
    name: c.name,
    region: c.region,
    address: c.address,
  }));

  const productsForForm = products.map((p) => ({
    id: p.id,
    name: p.name,
    code: p.code,
    stockTons: p.stockTons,
    pricePerTon: p.pricePerTon,
  }));

  return (
    <OrdersClient
      orders={orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        status: o.status,
        totalValue: o.totalValue,
        deliveryDate: o.deliveryDate.toISOString(),
        customer: {
          name: o.customer.name,
          region: o.customer.region,
        },
        items: o.items.map((i) => ({
          productName: i.productName,
          quantityTons: i.quantityTons,
        })),
      }))}
      customers={customersForForm}
      products={productsForForm}
    />
  );
}