import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const PLANS = {
  standard: { plan: "STANDARD", pricePerWeek: 150 },
  premium: { plan: "PREMIUM", pricePerWeek: 200 },
  family: { plan: "FAMILY", pricePerWeek: 225 },
};

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in first" }, { status: 401 });
  }

  try {
    const { planKey } = await request.json();
    const planConfig = PLANS[planKey as keyof typeof PLANS];

    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Check if already has active subscription
    const existing = await prisma.subscription.findFirst({
      where: { customerId: user.id, status: "ACTIVE" },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already have an active subscription" },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const nextDelivery = new Date();
    nextDelivery.setDate(nextDelivery.getDate() + 3);

    const subscription = await prisma.subscription.create({
      data: {
        customerId: user.id,
        plan: planConfig.plan,
        pricePerWeek: planConfig.pricePerWeek,
        status: "ACTIVE",
        startDate,
        nextDelivery,
        deliveriesTotal: 4,
      },
    });

    return NextResponse.json({ subscription }, { status: 201 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
