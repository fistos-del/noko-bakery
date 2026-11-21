"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const STATUSES = ["ALL", "PENDING", "CONFIRMED", "BAKING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
const PAYMENTS = ["ALL", "PENDING", "PAID", "FAILED", "REFUNDED"];

export default function OrdersFilters({
  currentStatus,
  currentPayment,
  currentQuery,
}: {
  currentStatus: string;
  currentPayment: string;
  currentQuery: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(currentQuery);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "ALL" || value === "") next.delete(key);
    else next.set(key, value);
    router.push(`/admin/orders?${next.toString()}`);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== currentQuery) update("q", q);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search order #, name, email..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ flex: 1, minWidth: 220, padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, background: "var(--surface)" }}
      />
      <select value={currentStatus} onChange={(e) => update("status", e.target.value)} style={selectStyle}>
        {STATUSES.map((s) => <option key={s} value={s}>{s === "ALL" ? "All statuses" : s.replace(/_/g, " ")}</option>)}
      </select>
      <select value={currentPayment} onChange={(e) => update("payment", e.target.value)} style={selectStyle}>
        {PAYMENTS.map((p) => <option key={p} value={p}>{p === "ALL" ? "All payments" : p}</option>)}
      </select>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 13,
  background: "var(--surface)",
  cursor: "pointer",
  fontWeight: 600,
};
