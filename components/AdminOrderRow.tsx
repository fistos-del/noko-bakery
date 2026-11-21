"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
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
  "PENDING", "CONFIRMED", "BAKING", "READY",
  "OUT_FOR_DELIVERY", "DELIVERED",
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

const PAYMENT_COLORS: Record<string, string> = {
  PENDING: "#C9A24B",
  PAID: "#2E7D32",
  FAILED: "#C0392B",
  REFUNDED: "#6B7280",
};

export default function AdminOrderRow({ order: initialOrder }: { order: Order }) {
  const [order, setOrder] = useState(initialOrder);
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const patch = async (payload: { status?: string; paymentStatus?: string }) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setOrder({ ...order, ...payload });
      }
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      <div
        style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", flexWrap: "wrap", gap: 12 }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: 0.3 }}>#{order.orderNumber}</span>
            <span style={{ fontSize: 10, fontWeight: 900, padding: "3px 10px", borderRadius: 100, background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status], letterSpacing: 0.8, textTransform: "uppercase" }}>
              {order.status.replace(/_/g, " ")}
            </span>
            <span style={{ fontSize: 10, fontWeight: 900, padding: "3px 10px", borderRadius: 100, background: PAYMENT_COLORS[order.paymentStatus] + "22", color: PAYMENT_COLORS[order.paymentStatus], letterSpacing: 0.8, textTransform: "uppercase" }}>
              {order.paymentStatus}
            </span>
            <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700 }}>
              {order.paymentMethod}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {order.guestName || "Guest"} ·{" "}
            {new Date(order.createdAt).toLocaleDateString("en-ZA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}{" "}
            · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "var(--primary-light)" }}>R {order.total.toFixed(0)}</div>
          <span style={{ fontSize: 14, color: "var(--text-soft)", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border-dark)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, padding: "20px 0", fontSize: 13 }}>
                <div>
                  <div style={labelStyle}>Customer</div>
                  <div style={{ color: "var(--text)" }}>{order.guestName || "Guest"}</div>
                </div>
                <div>
                  <div style={labelStyle}>Contact</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {order.guestPhone}<br />{order.guestEmail}
                  </div>
                </div>
                <div>
                  <div style={labelStyle}>{order.type === "DELIVERY" ? "Address" : "Collection"}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {order.type === "DELIVERY" ? order.address : "Mooikloof Glen Estate, 8–10am"}
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-dark)" }}>
                <div style={labelStyle}>Items</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--text-muted)" }}>{item.quantity}× {item.name}</span>
                      <span style={{ fontWeight: 700 }}>R {item.subtotal.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border-dark)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {/* Status dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => patch({ status: e.target.value })}
                  disabled={updating}
                  style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: updating ? "wait" : "pointer" }}
                >
                  {[...STATUS_ORDER, "CANCELLED"].map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                  ))}
                </select>

                {/* Payment toggle */}
                {order.paymentStatus !== "PAID" ? (
                  <button
                    onClick={() => patch({ paymentStatus: "PAID" })}
                    disabled={updating}
                    style={{ padding: "10px 18px", background: "#2E7D32", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase", cursor: updating ? "wait" : "pointer" }}
                  >
                    Mark as Paid
                  </button>
                ) : (
                  <span style={{ padding: "10px 18px", background: "#2E7D3222", color: "#2E7D32", borderRadius: 8, fontSize: 12, fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase" }}>
                    ✓ Paid
                  </span>
                )}

                <button onClick={() => window.open(`/order/${order.id}/receipt`, "_blank")} style={secondaryBtn}>View Receipt</button>
                <button onClick={() => window.open(`/track/${order.id}`, "_blank")} style={secondaryBtn}>View Tracking</button>
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

const secondaryBtn: React.CSSProperties = {
  padding: "10px 18px",
  background: "transparent",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};
