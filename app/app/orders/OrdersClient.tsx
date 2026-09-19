"use client";

import { useState } from "react";
import Card from "@/components/Card";
import NewOrderModal from "@/components/NewOrderModal";

interface OrderRow {
  id: string;
  orderNumber: string;
  status: string;
  totalValue: number;
  deliveryDate: string;
  customer: {
    name: string;
    region: string;
  };
  items: {
    productName: string;
    quantityTons: number;
  }[];
}

interface CustomerOption {
  id: string;
  name: string;
  region: string;
  address: string;
}

interface ProductOption {
  id: string;
  name: string;
  code: string;
  stockTons: number;
  pricePerTon: number;
}

export default function OrdersClient({
  orders,
  customers,
  products,
}: {
  orders: OrderRow[];
  customers: CustomerOption[];
  products: ProductOption[];
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Orders
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            {orders.length} total orders
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: "var(--primary)",
            color: "#0F1611",
            border: "none",
            padding: "12px 20px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: 0.3,
            boxShadow: "0 4px 16px rgba(140, 198, 63, 0.25)",
          }}
        >
          + New Order
        </button>
      </div>

      <Card>
        <div className="table-wrap">
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <Th>Order #</Th>
                <Th>Customer</Th>
                <Th>Region</Th>
                <Th>Items</Th>
                <Th>Total Tons</Th>
                <Th>Value</Th>
                <Th>Delivery Date</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const totalTons = o.items.reduce(
                  (s, i) => s + i.quantityTons,
                  0
                );
                return (
                  <tr
                    key={o.id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <Td>
                      <strong>{o.orderNumber}</strong>
                    </Td>
                    <Td>{o.customer.name}</Td>
                    <Td>{o.customer.region}</Td>
                    <Td>{o.items.length}</Td>
                    <Td>{totalTons}t</Td>
                    <Td>{formatZAR(o.totalValue)}</Td>
                    <Td>{formatDate(o.deliveryDate)}</Td>
                    <Td>
                      <StatusBadge status={o.status} />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <NewOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        customers={customers}
        products={products}
      />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "8px 12px",
        color: "var(--text-muted)",
        fontWeight: 700,
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "10px 12px" }}>{children}</td>;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "#F59E0B",
    CONFIRMED: "#3B82F6",
    IN_PRODUCTION: "#8B5CF6",
    READY: "#06B6D4",
    OUT_FOR_DELIVERY: "#F97316",
    DELIVERED: "#10B981",
    INVOICED: "#6366F1",
    PAID: "#059669",
  };
  const color = colors[status] || "#666";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        background: `${color}22`,
        color,
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}