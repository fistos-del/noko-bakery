import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Hyamatla FertiTrack database...");

  // Clear existing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.rawMaterial.deleteMany();

  // ─────────────────────────────────────
  // RAW MATERIALS — Hya Power inputs
  // ─────────────────────────────────────
  await prisma.rawMaterial.createMany({
    data: [
      {
        name: "Water Hyacinth Biomass",
        currentTons: 128,       // tons of harvested hyacinth waiting to be mineralised
        minTons: 40,
        supplier: "Hartbeespoort Dam Operations",
        leadTimeDays: 2,
      },
      {
        name: "Mineralisation Agent",
        currentTons: 8.5,
        minTons: 5,
        supplier: "Local Chemical Partner",
        leadTimeDays: 7,
      },
      {
        name: "Potassium Source",
        currentTons: 14,
        minTons: 10,
        supplier: "K+S Africa",
        leadTimeDays: 10,
      },
      {
        name: "Phosphate Source",
        currentTons: 6.2,       // critically low
        minTons: 8,
        supplier: "Foskor",
        leadTimeDays: 14,
      },
      {
        name: "Packaging (1kg bags)",
        currentTons: 2.4,
        minTons: 1,
        supplier: "Local Packaging Co.",
        leadTimeDays: 5,
      },
      {
        name: "Packaging (50kg bags)",
        currentTons: 4.8,
        minTons: 2,
        supplier: "Local Packaging Co.",
        leadTimeDays: 5,
      },
      {
        name: "Packaging (1 ton bulk bags)",
        currentTons: 1.2,
        minTons: 0.5,
        supplier: "Local Packaging Co.",
        leadTimeDays: 7,
      },
    ],
  });

  // ─────────────────────────────────────
  // PRODUCTS — Real Hya Power lineup
  // ─────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        name: "Hya Power — 1 kg Retail",
        code: "HP-1KG",
        npk: "16 nutrients",
        category: "RETAIL",
        description:
          "Perfect for home gardens, pots, and seedlings. One bag feeds a 2m² garden bed for the season.",
        primaryUse: "Home gardens, pots, seedlings",
        packaging: "1 kg retail bag",
        pricePerTon: 9000,        // R9/kg × 1000
        stockTons: 3.2,
        minStockTons: 1,
        imageUrl: "/images/products/hya-power-1kg.jpg",
      },
      {
        name: "Hya Power — 10 kg Garden",
        code: "HP-10KG",
        npk: "16 nutrients",
        category: "GARDEN",
        description:
          "Ideal for homesteads and food gardens. Feeds up to 100m² for a full growing season.",
        primaryUse: "Homesteads, food gardens",
        packaging: "10 kg bag",
        pricePerTon: 9500,        // R95/10kg = R9.5/kg
        stockTons: 12,
        minStockTons: 5,
        imageUrl: "/images/products/hya-power-10kg.jpg",
      },
      {
        name: "Hya Power — 50 kg Farm",
        code: "HP-50KG",
        npk: "16 nutrients",
        category: "COMMERCIAL",
        description:
          "The workhorse size for commercial organic farms. Feeds half a hectare at recommended rate.",
        primaryUse: "Commercial organic farms",
        packaging: "50 kg bag",
        pricePerTon: 8500,        // R425/50kg = R8.5/kg
        stockTons: 28,
        minStockTons: 15,
        imageUrl: "/images/products/hya-power-50kg.jpg",
      },
      {
        name: "Hya Power — 100 kg Bulk",
        code: "HP-100KG",
        npk: "16 nutrients",
        category: "BULK",
        description:
          "For larger operations and cooperatives. Mixed application for one hectare coverage.",
        primaryUse: "Large farms, co-ops",
        packaging: "100 kg bag",
        pricePerTon: 8100,        // R810/100kg = R8.1/kg
        stockTons: 22,
        minStockTons: 12,
        imageUrl: "/images/products/hya-power-100kg.jpg",
      },
      {
        name: "Hya Power — 1 Ton Bulk",
        code: "HP-1T",
        npk: "16 nutrients",
        category: "BULK",
        description:
          "The most economical option for farms and distributors. Free delivery anywhere in South Africa.",
        primaryUse: "Distributors, commercial farms",
        packaging: "1 ton bulk bag",
        pricePerTon: 6095,        // R6095/1000kg
        stockTons: 14,
        minStockTons: 8,
        imageUrl: "/images/products/hya-power-1t.jpg",
      },
      {
        name: "Hya Power — Distributor Pallet",
        code: "HP-PALLET",
        npk: "16 nutrients",
        category: "DISTRIBUTOR",
        description:
          "Bespoke pricing for distributors and municipalities. Custom packaging and private label available.",
        primaryUse: "Distribution partners",
        packaging: "Pallet or bulk orders",
        pricePerTon: 5900,        // Distributor tier
        stockTons: 5,             // On-demand
        minStockTons: 2,
        imageUrl: "/images/products/hya-power-pallet.jpg",
      },
    ],
  });

  // ─────────────────────────────────────
  // CUSTOMERS — Real organic farms & co-ops
  // ─────────────────────────────────────
  await prisma.customer.createMany({
    data: [
      {
        name: "Kroonstad Organic Co-op",
        type: "COOP",
        contactName: "Pieter van der Merwe",
        phone: "+27 56 212 3400",
        email: "pieter@kroonstadorganic.co.za",
        region: "Free State",
        address: "Plot 14, Kroonstad District, Free State, 9499",
        creditLimit: 350000,
      },
      {
        name: "Klein Drakenstein Vineyards",
        type: "COMMERCIAL_FARM",
        contactName: "Hendrik van Wyk",
        phone: "+27 21 887 5678",
        email: "hendrik@kleindrakenstein.co.za",
        region: "Western Cape",
        address: "R44, Simondium, Western Cape, 7670",
        creditLimit: 250000,
      },
      {
        name: "Mthonjaneni Regenerative Farms",
        type: "COMMERCIAL_FARM",
        contactName: "Thandi Nkosi",
        phone: "+27 35 572 4190",
        email: "thandi@mthonjaneni.co.za",
        region: "KwaZulu-Natal",
        address: "Melmoth District, KwaZulu-Natal, 3835",
        creditLimit: 400000,
      },
      {
        name: "Highveld Organic Vegetables",
        type: "COMMERCIAL_FARM",
        contactName: "Sipho Mokoena",
        phone: "+27 11 900 4512",
        email: "sipho@highveldorganic.co.za",
        region: "Gauteng",
        address: "Plot 22, Tarlton, Gauteng, 1749",
        creditLimit: 180000,
      },
      {
        name: "Blyde River Citrus",
        type: "COMMERCIAL_FARM",
        contactName: "Annemarie Botha",
        phone: "+27 15 390 2277",
        email: "annemarie@blyderivercitrus.co.za",
        region: "Mpumalanga",
        address: "Farm 47, Blyde River Valley, Mpumalanga, 1380",
        creditLimit: 320000,
      },
      {
        name: "Green Route Distributors",
        type: "DISTRIBUTOR",
        contactName: "Lerato Dlamini",
        phone: "+27 31 305 9876",
        email: "lerato@greenroute.co.za",
        region: "KwaZulu-Natal",
        address: "45 Umgeni Road, Durban, 4001",
        creditLimit: 1200000,
      },
    ],
  });

  // ─────────────────────────────────────
  // SAMPLE ORDERS
  // ─────────────────────────────────────
  const products = await prisma.product.findMany();
  const customers = await prisma.customer.findMany();

  const hp50 = products.find((p) => p.code === "HP-50KG")!;
  const hp1t = products.find((p) => p.code === "HP-1T")!;
  const hp10 = products.find((p) => p.code === "HP-10KG")!;
  const hp100 = products.find((p) => p.code === "HP-100KG")!;
  const hpPallet = products.find((p) => p.code === "HP-PALLET")!;

  // Order 1: Free State Co-op — big bulk delivery, out for delivery
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0041",
      customerId: customers[0].id,
      status: "OUT_FOR_DELIVERY",
      deliveryDate: new Date(Date.now() + 86400000),
      deliveryAddress: customers[0].address,
      notes: "Deliver to silo 3. Call on arrival for gate access.",
      totalValue: 20 * hp1t.pricePerTon,
      items: {
        create: [
          {
            productId: hp1t.id,
            productName: hp1t.name,
            quantityTons: 20,
            pricePerTon: hp1t.pricePerTon,
            subtotal: 20 * hp1t.pricePerTon,
          },
        ],
      },
    },
  });

  // Order 2: Klein Drakenstein — vineyards, confirmed
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0042",
      customerId: customers[1].id,
      status: "CONFIRMED",
      deliveryDate: new Date(Date.now() + 3 * 86400000),
      deliveryAddress: customers[1].address,
      notes: "Split delivery: 5t morning, 5t afternoon. Vineyard access via N1 side.",
      totalValue: 12 * hp1t.pricePerTon,
      items: {
        create: [
          {
            productId: hp1t.id,
            productName: hp1t.name,
            quantityTons: 12,
            pricePerTon: hp1t.pricePerTon,
            subtotal: 12 * hp1t.pricePerTon,
          },
        ],
      },
    },
  });

  // Order 3: Mthonjaneni — pasture, pending
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0043",
      customerId: customers[2].id,
      status: "PENDING",
      deliveryDate: new Date(Date.now() + 5 * 86400000),
      deliveryAddress: customers[2].address,
      notes: "Pasture land needs 25t for full season. Confirm split across 2 trucks.",
      totalValue: 25 * hp1t.pricePerTon,
      items: {
        create: [
          {
            productId: hp1t.id,
            productName: hp1t.name,
            quantityTons: 25,
            pricePerTon: hp1t.pricePerTon,
            subtotal: 25 * hp1t.pricePerTon,
          },
        ],
      },
    },
  });

  // Order 4: Highveld Organic — retail mix, invoiced
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0038",
      customerId: customers[3].id,
      status: "INVOICED",
      deliveryDate: new Date(Date.now() - 5 * 86400000),
      deliveryAddress: customers[3].address,
      notes: "Mix of 10kg and 50kg bags for vegetable tunnels.",
      totalValue: 40 * hp10.pricePerTon + 60 * hp50.pricePerTon,
      items: {
        create: [
          {
            productId: hp10.id,
            productName: hp10.name,
            quantityTons: 40,
            pricePerTon: hp10.pricePerTon,
            subtotal: 40 * hp10.pricePerTon,
          },
          {
            productId: hp50.id,
            productName: hp50.name,
            quantityTons: 60,
            pricePerTon: hp50.pricePerTon,
            subtotal: 60 * hp50.pricePerTon,
          },
        ],
      },
    },
  });

  // Order 5: Green Route Distributors — bulk for resale, paid
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0035",
      customerId: customers[5].id,
      status: "PAID",
      deliveryDate: new Date(Date.now() - 12 * 86400000),
      deliveryAddress: customers[5].address,
      notes: "Wholesale pallet for KZN retail network. Invoice to head office.",
      totalValue: 30 * hpPallet.pricePerTon,
      items: {
        create: [
          {
            productId: hpPallet.id,
            productName: hpPallet.name,
            quantityTons: 30,
            pricePerTon: hpPallet.pricePerTon,
            subtotal: 30 * hpPallet.pricePerTon,
          },
        ],
      },
    },
  });

  // Order 6: Blyde River Citrus — bulk, ready for dispatch
  await prisma.order.create({
    data: {
      orderNumber: "HYP-2025-0044",
      customerId: customers[4].id,
      status: "READY",
      deliveryDate: new Date(Date.now() + 2 * 86400000),
      deliveryAddress: customers[4].address,
      notes: "Confirm with farm manager before 8am.",
      totalValue: 18 * hp100.pricePerTon,
      items: {
        create: [
          {
            productId: hp100.id,
            productName: hp100.name,
            quantityTons: 18,
            pricePerTon: hp100.pricePerTon,
            subtotal: 18 * hp100.pricePerTon,
          },
        ],
      },
    },
  });

  console.log("✅ Hyamatla FertiTrack seed complete!");
  console.log("   - 7 raw materials (incl. water hyacinth, minerals, packaging)");
  console.log("   - 6 Hya Power products (1kg → pallet)");
  console.log("   - 6 customers (organic farms, co-ops, distributor)");
  console.log("   - 6 orders across all statuses");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });