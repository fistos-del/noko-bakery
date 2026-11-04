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
    const data: any = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.category !== undefined) data.category = body.category;
    if (body.contents !== undefined) data.contents = JSON.stringify(body.contents);
    if (body.allergens !== undefined) data.allergens = body.allergens;
    if (body.inStock !== undefined) data.inStock = body.inStock;
    if (body.isSeasonal !== undefined) data.isSeasonal = body.isSeasonal;

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete product (may have orders)" },
      { status: 500 }
    );
  }
}
