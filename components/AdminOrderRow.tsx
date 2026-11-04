"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  type: string;
  address: string | null;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number; subtotal: number }[];
}

const STATUS_ORDER = [
  "PENDING",
  "CONFIRMED",
  "BAKING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#C9A24B",
  CONFIRMED: "#D4A843",
  BAKING: "#E85A24",
  READY: "#4E7A1F",
  OUT_FOR_DELIVERY: "#1B4965",
  DELIVERED: "#8CC63F",
  CANCELLED: "#C0392B",
};

export default function AdminOrderRow({ order: initialOrder }: { order: Order }) {
  const [order, setOrder] = useState(initialOrder);
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrder({ ...order, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setUpdating(false);
    }
  };

  const currentIndex = STATUS_ORDER.indexOf(order.status);
  const nextStatus =
    currentIndex >= 0 && currentIndex < STATUS_ORDER.length - 1
      ? STATUS_ORDER[currentIndex + 1]
      : null;

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          flexWrap: "wrap",
          gap: 12,
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 0.3,
              }}
            >
              #{order.orderNumber}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                padding: "3px 10px",
                borderRadius: 100,
                background: STATUS_COLORS[order.status] + "22",
                color: STATUS_COLORS[order.status],
                letterSpacing: 0.8,
                textTransform: "uppercase",
              }}
            >
              {order.status.replace(/_/g, " ")}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {order.guestName || "Guest"} ·{" "}
            {new Date(order.createdAt).toLocaleDateString("en-ZA", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · {order.items.length} item
            {order.items.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "var(--primary-light)",
            }}
          >
            R {order.total.toFixed(0)}
          </div>
          <span
            style={{
              fontSize: 14,
              color: "var(--text-soft)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            ▾
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 20px 20px",
                borderTop: "1px solid var(--border-dark)",
              }}
            >
              {/* Customer details */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                  padding: "20px 0",
                  fontSize: 13,
                }}
              >
                <div>
                  <div style={labelStyle}>Customer</div>
                  <div style={{ color: "var(--text)" }}>
                    {order.guestName || "Guest"}
                  </div>
                </div>
                <div>
                  <div style={labelStyle}>Contact</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {order.guestPhone}
                    <br />
                    {order.guestEmail}
                  </div>
                </div>
                <div>
                  <div style={labelStyle}>
                    {order.type === "DELIVERY" ? "Address" : "Collection"}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {order.type === "DELIVERY"
                      ? order.address
                      : "Mooikloof Glen Estate, 8–10am"}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div
                style={{
                  paddingTop: 16,
                  borderTop: "1px solid var(--border-dark)",
                }}
              >
                <div style={labelStyle}>Items</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.quantity}× {item.name}
                      </span>
                      <span style={{ fontWeight: 700 }}>
                        R {item.subtotal.toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid var(--border-dark)",
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {nextStatus && (
                  <button
                    onClick={() => updateStatus(nextStatus)}
                    disabled={updating}
                    style={{
                      padding: "10px 18px",
                      background: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      cursor: updating ? "wait" : "pointer",
                      opacity: updating ? 0.6 : 1,
                    }}
                  >
                    {updating
                      ? "Updating..."
                      : `Mark as ${nextStatus.replace(/_/g, " ")}`}
                  </button>
                )}
                <button
                  onClick={() =>
                    window.open(`/order/${order.id}/receipt`, "_blank")
                  }
                  style={{
                    padding: "10px 18px",
                    background: "transparent",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View Receipt
                </button>
                <button
                  onClick={() =>
                    window.open(`/track/${order.id}`, "_blank")
                  }
                  style={{
                    padding: "10px 18px",
                    background: "transparent",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View Tracking
                </button>
                {order.status !== "CANCELLED" &&
                  order.status !== "DELIVERED" && (
                    <button
                      onClick={() => updateStatus("CANCELLED")}
                      disabled={updating}
                      style={{
                        padding: "10px 18px",
                        background: "transparent",
                        color: "var(--danger)",
                        border: "1px solid var(--danger)",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: updating ? "wait" : "pointer",
                        marginLeft: "auto",
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  color: "var(--text-soft)",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  fontWeight: 800,
  marginBottom: 4,
};
