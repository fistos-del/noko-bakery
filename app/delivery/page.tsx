"use client";

import Link from "next/link";

export default function DeliveryPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px" }}>
      <div style={{ marginBottom: 60 }}>
        <div style={{ fontSize: 11, color: "var(--primary)", letterSpacing: 3, textTransform: "uppercase", fontWeight: 800, marginBottom: 16 }}>
          Getting Your Order
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20, color: "var(--text)" }}>
          Delivery &amp; Collection
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 600 }}>
          Two ways to get your fresh bread. Choose what works best for you.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 60 }} className="grid-stack-mobile">
        <div style={{ padding: 32, background: "var(--surface)", border: "2px solid var(--border)" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🚚</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, color: "var(--text)" }}>Delivery to your door</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>
            We deliver fresh to your door across Pretoria East — within a 15–20km radius of Mooikloof Glen.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoRow label="Flat delivery fee" value="R 25" />
            <InfoRow label="Delivery radius" value="15–20 km" />
            <InfoRow label="Delivery days" value="Tue · Thu · Sat" />
            <InfoRow label="Delivery window" value="9am – 1pm" />
          </div>
        </div>

        <div style={{ padding: 32, background: "var(--surface)", border: "2px solid var(--border)" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>📍</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16, color: "var(--text)" }}>Collection from the estate</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>
            Collect your order from the gate at Mooikloof Glen Country Estate. Free of charge.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoRow label="Collection fee" value="Free" />
            <InfoRow label="Location" value="Mooikloof Glen gate" />
            <InfoRow label="Days" value="Tue · Thu · Sat" />
            <InfoRow label="Hours" value="8am – 10am" />
          </div>
        </div>
      </div>

      <div style={{ padding: 40, background: "var(--bg-alt)", border: "2px solid var(--border)", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, color: "var(--text)" }}>Ready to order?</h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>Choose your delivery or collection at checkout.</p>
        <Link href="/shop" className="btn-orange" style={{ display: "inline-block" }}>Shop Now →</Link>
      </div>

      <style>{`@media (max-width: 900px) { .grid-stack-mobile { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 800, color: "var(--text)" }}>{value}</span>
    </div>
  );
}
