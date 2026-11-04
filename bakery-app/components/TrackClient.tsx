"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrderClock, { type OrderStatus } from "./OrderClock";

interface OrderData {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  type: "DELIVERY" | "COLLECTION";
  total: number;
  address?: string | null;
  createdAt: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}

const STATUS_STEPS: { status: OrderStatus; label: string }[] = [
  { status: "PENDING", label: "Received" },
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "BAKING", label: "Baking" },
  { status: "READY", label: "Ready" },
  { status: "OUT_FOR_DELIVERY", label: "On the way" },
  { status: "DELIVERED", label: "Delivered" },
];

export default function TrackClient({
  initialOrder,
}: {
  initialOrder: OrderData;
}) {
  const [order, setOrder] = useState(initialOrder);

  // Poll for updates every 30s
  useEffect(() => {
    if (order.status === "DELIVERED" || order.status === "CANCELLED") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${order.id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch {
        // Silent fail — polling shouldn't crash the page
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [order.id, order.status]);

  const currentIndex = STATUS_STEPS.findIndex((s) => s.status === order.status);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* The clock */}
      <OrderClock status={order.status} orderNumber={order.orderNumber} />

      {/* Status timeline */}
      <div
        style={{
          marginTop: 60,
          padding: 32,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-soft)",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 24,
          }}
        >
          Order Progress
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Vertical line behind */}
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 12,
              bottom: 12,
              width: 2,
              background: "var(--border-dark)",
              zIndex: 0,
            }}
          />

          {/* Filled portion */}
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 12,
              height: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%`,
              width: 2,
              background: "var(--primary)",
              zIndex: 1,
              transition: "height 0.8s ease",
            }}
          />

          {STATUS_STEPS.map((step, i) => {
            const isPast = i < currentIndex;
            const isCurrent = i === currentIndex;
            const isFuture = i > currentIndex;

            return (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: isPast
                      ? "var(--primary)"
                      : isCurrent
                        ? "var(--primary)"
                        : "var(--bg-alt)",
                    border: isCurrent
                      ? "3px solid var(--primary-light)"
                      : isPast
                        ? "3px solid var(--primary)"
                        : "2px solid var(--border-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 900,
                    color: isPast || isCurrent ? "white" : "var(--text-soft)",
                    flexShrink: 0,
                    boxShadow: isCurrent
                      ? "0 0 0 6px rgba(181, 56, 143, 0.2)"
                      : "none",
                  }}
                >
                  {isPast ? "✓" : isCurrent ? "●" : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: isCurrent ? 900 : 700,
                      color: isFuture ? "var(--text-soft)" : "var(--text)",
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Order details */}
      <div
        style={{
          marginTop: 24,
          padding: 32,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-soft)",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 20,
          }}
        >
          Order Details
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {order.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border-dark)",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>
                {item.quantity}× {item.name}
              </span>
              <span style={{ fontWeight: 700 }}>
                R {item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--border-dark)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700 }}>Total paid</span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "var(--primary-light)",
            }}
          >
            R {order.total.toFixed(2)}
          </span>
        </div>

        {order.address && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border-dark)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Delivering to
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {order.address}
            </div>
          </div>
        )}

        {order.type === "COLLECTION" && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border-dark)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Collect from
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Mooikloof Glen Country Estate gate, 8–10am
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
