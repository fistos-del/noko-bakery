"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { validateDeliveryDate, getEarliestDeliveryDate } from "@/lib/deliveryDates";

function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 14,
  background: "var(--surface)",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, color: "var(--text-muted)" }}>
        {label}{required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<"DELIVERY" | "COLLECTION">("DELIVERY");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "EFT" | "QR">("CARD");
  const [discountCode, setDiscountCode] = useState("");

  const deliveryFee = type === "DELIVERY" ? 25 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your cart is empty");
      return;
    }
    if (!deliveryDate) {
      setError("Please pick a delivery or collection date");
      return;
    }
    const dateCheck = validateDeliveryDate(deliveryDate);
    if (!dateCheck.valid) {
      setError(dateCheck.error || "Invalid date");
      return;
    }
    if (type === "DELIVERY" && !address) {
      setError("Address is required for delivery");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          name,
          email,
          phone,
          type,
          address: type === "DELIVERY" ? address : undefined,
          notes: notes || undefined,
          paymentMethod,
          discountCode: discountCode || undefined,
          deliveryDate: new Date(deliveryDate + "T00:00:00").toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to place order");
        setLoading(false);
        return;
      }
      clearCart();
      router.push(`/checkout/pay/${data.orderId}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const earliest = getEarliestDeliveryDate();

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "100px 24px 80px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>Checkout</h1>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
        {items.length} item{items.length !== 1 ? "s" : ""} · R {total.toFixed(2)}
      </p>

      {error && (
        <div style={{ padding: 14, background: "#fee", color: "#900", borderRadius: 8, fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Full Name" required>
            <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </Field>
          <Field label="Phone" required>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} />
          </Field>
        </div>

        <Field label="Email" required>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        </Field>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" onClick={() => setType("DELIVERY")} style={{ flex: 1, padding: 14, border: `2px solid ${type === "DELIVERY" ? "var(--brand-plum)" : "var(--border)"}`, background: type === "DELIVERY" ? "var(--brand-plum)" : "transparent", color: type === "DELIVERY" ? "white" : "var(--text)", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>
            Delivery (R25)
          </button>
          <button type="button" onClick={() => setType("COLLECTION")} style={{ flex: 1, padding: 14, border: `2px solid ${type === "COLLECTION" ? "var(--brand-plum)" : "var(--border)"}`, background: type === "COLLECTION" ? "var(--brand-plum)" : "transparent", color: type === "COLLECTION" ? "white" : "var(--text)", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>
            Collection (Free)
          </button>
        </div>

        {type === "DELIVERY" && (
          <Field label="Delivery Address" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} required style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
          </Field>
        )}

        <Field label={type === "DELIVERY" ? "Preferred Delivery Date" : "Preferred Collection Date"} required>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => {
              const v = e.target.value;
              setDeliveryDate(v);
              if (v) {
                const check = validateDeliveryDate(v);
                if (!check.valid) setError(check.error || "Invalid date");
                else if (error.includes("Sunday") || error.includes("public holiday") || error.includes("48 hours")) setError("");
              }
            }}
            min={toInputDate(earliest)}
            required
            style={inputStyle}
          />
          <p style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>
            We're closed on Sundays and public holidays. Minimum 48 hours' notice.
            Earliest available: <strong>{earliest.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" })}</strong>.
          </p>
        </Field>

        <Field label="Payment Method" required>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["CARD", "EFT", "QR"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setPaymentMethod(m)} style={{ flex: 1, minWidth: 100, padding: 12, border: `2px solid ${paymentMethod === m ? "var(--brand-plum)" : "var(--border)"}`, background: paymentMethod === m ? "var(--brand-plum)" : "transparent", color: paymentMethod === m ? "white" : "var(--text)", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                {m === "CARD" ? "💳 Card" : m === "EFT" ? "🏦 Instant EFT" : "📱 QR Code"}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Discount Code (optional)">
          <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="e.g. WELCOME10" style={inputStyle} />
        </Field>

        <Field label="Order Notes (optional)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
        </Field>

        <div style={{ padding: 20, background: "var(--bg-alt)", borderRadius: 12, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
            <span>Subtotal</span>
            <span>R {subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
            <span>{type === "DELIVERY" ? "Delivery fee" : "Collection"}</span>
            <span>{type === "DELIVERY" ? `R ${deliveryFee.toFixed(2)}` : "Free"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
            <span>Total</span>
            <span>R {total.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ padding: 18, background: "var(--brand-plum)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Placing order..." : "Place Order →"}
        </button>
      </form>
    </div>
  );
}
