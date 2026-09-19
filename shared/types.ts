// shared/types.ts

export type ProductCategory =
  | "VELDMASTER"
  | "VINEGUARD"
  | "PASTUREBOOST"
  | "SEEDSTART"
  | "FOLIARFEED"
  | "ORGANICCOMPOST";

export interface Product {
  id: string;
  name: string;
  code: string;
  npk: string;
  category: ProductCategory;
  description: string;
  primaryUse: string;
  packaging: string[];
  pricePerTon: number;
  stockTons: number;
  minStockTons: number;
  imageUrl: string;
}

export type RawMaterialName =
  | "Ammonium Nitrate"
  | "Phosphate Rock"
  | "Potassium Chloride"
  | "Urea"
  | "Fillers";

export interface RawMaterial {
  id: string;
  name: RawMaterialName;
  currentTons: number;
  minTons: number;
  supplier: string;
  leadTimeDays: number;
  lastOrderedAt: string;
}

export type CustomerType =
  | "DISTRIBUTOR"
  | "COOP"
  | "COMMERCIAL_FARM"
  | "CASH";

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  contactName: string;
  phone: string;
  email: string;
  region: string;
  address: string;
  creditLimit: number;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PRODUCTION"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "INVOICED"
  | "PAID";

export interface OrderItem {
  productId: string;
  productName: string;
  quantityTons: number;
  pricePerTon: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  deliveryDate: string;
  deliveryAddress: string;
  notes: string;
  totalValue: number;
  createdAt: string;
}

export interface StockAlert {
  id: string;
  type: "RAW_MATERIAL" | "FINISHED_GOOD";
  name: string;
  currentTons: number;
  minTons: number;
  severity: "LOW" | "CRITICAL";
  message: string;
}

export const REGIONS = [
  "Free State",
  "Western Cape",
  "KwaZulu-Natal",
  "Gauteng",
  "Mpumalanga",
  "Limpopo",
  "North West",
  "Eastern Cape",
  "Northern Cape",
] as const;

export const CROP_TYPES = [
  {
    name: "Maize",
    hectaresPerTon: 4,
    recommendedProduct: "VeldMaster 2:3:2 (22)",
  },
  {
    name: "Wheat",
    hectaresPerTon: 5,
    recommendedProduct: "VeldMaster 2:3:2 (22)",
  },
  {
    name: "Vineyard",
    hectaresPerTon: 3,
    recommendedProduct: "VineGuard 3:2:1 (25)",
  },
  {
    name: "Pasture",
    hectaresPerTon: 6,
    recommendedProduct: "PastureBoost LAN",
  },
  {
    name: "Vegetables",
    hectaresPerTon: 3,
    recommendedProduct: "SeedStart Super",
  },
] as const;

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "#F59E0B",
  CONFIRMED: "#3B82F6",
  IN_PRODUCTION: "#8B5CF6",
  READY: "#06B6D4",
  OUT_FOR_DELIVERY: "#F97316",
  DELIVERED: "#10B981",
  INVOICED: "#6366F1",
  PAID: "#059669",
};