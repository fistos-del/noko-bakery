import { prisma } from "@/lib/prisma";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentOrders = await prisma.order.findMany({
    where: { createdAt: { gte: weekAgo } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    stats: {
      orders: recentOrders.length,
      revenue: recentOrders.reduce((sum, o) => sum + o.total, 0),
    },
  });
}
