import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Noko Bakery database...");

  // Clear all existing data (in order of dependency)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.discountCode.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();

  console.log("  🗑️  Cleared existing data");

  // ─────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        slug: "bread-box",
        name: "Bread Box",
        description:
          "Our signature bread box — everything you need for a week of fresh sandwiches, toast, and snacks. Baked fresh on delivery day.",
        price: 180,
        category: "BOX",
        contents: JSON.stringify([
          "1 loaf of artisan bread",
          "1 focaccia",
          "4 bagels",
          "2 cinnamon twists",
        ]),
        allergens: "Gluten, Dairy",
        imageUrl: "/images/bread-box.jpg",
        inStock: true,
        isSeasonal: false,
      },
      {
        slug: "pastry-box",
        name: "Pastry Box",
        description:
          "Flaky, buttery, and irresistible. A curated selection of our best pastries — perfect for weekend breakfasts or sharing with guests.",
        price: 220,
        category: "BOX",
        contents: JSON.stringify([
          "4 croissants",
          "2 sausage rolls",
          "2 pain au chocolat",
          "2 danish",
        ]),
        allergens: "Gluten, Dairy, Egg",
        imageUrl: "/images/pastry-box.jpg",
        inStock: true,
        isSeasonal: false,
      },
      {
        slug: "mix-box",
        name: "Mix Box",
        description:
          "The best of both worlds. A little bread, a little pastry — the ideal box for a mixed household or a curious first-timer.",
        price: 200,
        category: "BOX",
        contents: JSON.stringify([
          "4 croissants",
          "1 focaccia",
          "1 loaf of bread",
          "2 danish",
        ]),
        allergens: "Gluten, Dairy, Egg",
        imageUrl: "/images/mix-box.jpg",
        inStock: true,
        isSeasonal: false,
      },
    ],
  });

  console.log("  ✅ 3 products created");

  // ─────────────────────────────────────
  // DISCOUNT CODE
  // ─────────────────────────────────────
  await prisma.discountCode.create({
    data: {
      code: "NOKO20",
      percentOff: 20,
      maxUses: 30,
      usesUsed: 0,
      active: true,
    },
  });

  console.log("  ✅ Discount code NOKO20 created (20% off, 30 uses)");

  // ─────────────────────────────────────
  // ADMIN CUSTOMER
  // ─────────────────────────────────────
  const adminPassword = "noko-admin-2025";
  await prisma.customer.create({
    data: {
      email: "admin@noko.co.za",
      passwordHash: hashPassword(adminPassword),
      name: "Dimpho",
      phone: "082 000 0000",
      address: "Mooikloof Glen Country Estate, Pretoria",
      isAdmin: true,
    },
  });

  console.log(`  ✅ Admin account created: admin@noko.co.za / ${adminPassword}`);
  console.log("");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
