"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

const PAYMENT_METHODS = [
  { id: "CARD", label: "Card", icon: "💳", desc: "Visa, Mastercard" },
  { id: "EFT", label: "Instant EFT", icon: "🏦", desc: "Bank transfer" },
  { id: "QR", label: "QR Code", icon: "📱", desc: "Scan to pay" },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"DELIVERY" | "COLLECTION">("DELIVERY");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "EFT" | "QR">(
    "CARD",
  );
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const deliveryFee = type === "DELIVERY" ? 25 : 0;
  const total = subtotal + deliveryFee - discountApplied;

  const handleApplyDiscount = async () => {
    setDiscountError("");
    if (!discountCode.trim()) return;
    // Simulate validation — real check happens server-side at order creation
    if (discountCode.toUpperCase() === "NOKO20") {
      setDiscountApplied(subtotal * 0.2);
    } else {
      setDiscountError("Invalid or expired code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (!name || !email || !phone) {
      setError("Please fill in your name, email, and phone");
      return;
    }

    if (type === "DELIVERY" && !address) {
      setError("Delivery address is required");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
          })),
          name,
          email,
          phone,
          type,
          address: type === "DELIVERY" ? address : undefined,
          notes,
          paymentMethod,
          discountCode: discountApplied > 0 ? discountCode : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }

      const data = await res.json();
      clearCart();
      router.push(`/order/${data.orderId}/receipt`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "140px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            marginBottom: 16,
            letterSpacing: -1,
          }}
        >
          Your cart is empty
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-muted)",
            marginBottom: 32,
          }}
        >
          Add some fresh bread or pastries to get started.
        </p>
        <Link
          href="/shop"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "var(--primary)",
            color: "white",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          Shop Now →
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <Link
          href="/shop"
          style={{
            fontSize: 12,
            color: "var(--accent)",
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          ← Back to shop
        </Link>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            letterSpacing: -1.5,
            marginTop: 20,
            marginBottom: 8,
          }}
        >
          Checkout
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          {type === "DELIVERY"
            ? "Delivered to your door across Pretoria East"
            : "Collect outside Mooikloof Glen Estate, 8–10am"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="checkout-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Step 1: Contact */}
          <Section title="1. Contact">
            <div
              className="checkout-fields"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <Field label="Full name" required>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  required
                />
              </Field>
              <Field label="Phone" required>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="082 000 0000"
                  style={inputStyle}
                  required
                />
              </Field>
            </div>
            <div style={{ marginTop: 16 }}>
              <Field label="Email" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                  required
                />
              </Field>
            </div>
          </Section>

          {/* Step 2: Delivery or Collection */}
          <Section title="2. Delivery or Collection">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={() => setType("DELIVERY")}
                style={{
                  padding: 20,
                  background:
                    type === "DELIVERY"
                      ? "var(--primary-soft)"
                      : "var(--surface)",
                  border: `1px solid ${
                    type === "DELIVERY" ? "var(--primary)" : "var(--border)"
                  }`,
                  borderRadius: 12,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>🚚</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    marginBottom: 4,
                    color: "var(--text)",
                  }}
                >
                  Delivery · R25
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  15–20km across Pretoria East
                </div>
              </button>
              <button
                type="button"
                onClick={() => setType("COLLECTION")}
                style={{
                  padding: 20,
                  background:
                    type === "COLLECTION"
                      ? "var(--primary-soft)"
                      : "var(--surface)",
                  border: `1px solid ${
                    type === "COLLECTION" ? "var(--primary)" : "var(--border)"
                  }`,
                  borderRadius: 12,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>📍</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    marginBottom: 4,
                    color: "var(--text)",
                  }}
                >
                  Collection · Free
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Mooikloof Glen Estate, 8–10am
                </div>
              </button>
            </div>

            {type === "DELIVERY" && (
              <div style={{ marginTop: 16 }}>
                <Field label="Delivery address" required>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, suburb, postal code"
                    rows={2}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    required
                  />
                </Field>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <Field label="Notes for the baker (optional)">
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Leave at the gate, ring the bell"
                  style={inputStyle}
                />
              </Field>
            </div>
          </Section>

          {/* Step 3: Payment */}
          <Section title="3. Payment Method">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    padding: "16px 12px",
                    background:
                      paymentMethod === m.id
                        ? "var(--primary-soft)"
                        : "var(--surface)",
                    border: `1px solid ${
                      paymentMethod === m.id
                        ? "var(--primary)"
                        : "var(--border)"
                    }`,
                    borderRadius: 12,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{m.icon}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: "var(--text)",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-soft)",
                      marginTop: 2,
                    }}
                  >
                    {m.desc}
                  </div>
                </button>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: "var(--surface-2)",
                borderRadius: 8,
                fontSize: 11,
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              💡 For the prototype, orders are marked as paid instantly. Real
              payment integration (Standard Bank + PayFast) goes live in a
              future update.
            </div>
          </Section>
        </div>

        {/* RIGHT: Order summary */}
        <div
          style={{
            position: "sticky",
            top: 100,
            padding: 28,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Order Summary
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.id}
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
                  R {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Discount code */}
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontSize: 10,
                color: "var(--text-soft)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              Discount Code
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="NOKO20"
                style={{ ...inputStyle, fontSize: 12, flex: 1 }}
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                style={{
                  padding: "10px 16px",
                  background: "var(--accent)",
                  color: "#2A1B2D",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
            {discountApplied > 0 && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--success)",
                  fontWeight: 700,
                }}
              >
                ✓ {discountCode} applied —{" "}
                {((discountApplied / subtotal) * 100).toFixed(0)}% off
              </div>
            )}
            {discountError && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--danger)",
                  fontWeight: 700,
                }}
              >
                {discountError}
              </div>
            )}
          </div>

          {/* Totals */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--border-dark)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Row label="Subtotal" value={`R ${subtotal.toFixed(2)}`} />
            <Row
              label={type === "DELIVERY" ? "Delivery" : "Collection"}
              value={deliveryFee > 0 ? `R ${deliveryFee.toFixed(2)}` : "Free"}
            />
            {discountApplied > 0 && (
              <Row
                label="Discount"
                value={`- R ${discountApplied.toFixed(2)}`}
                color="var(--success)"
              />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                fontWeight: 900,
                marginTop: 12,
                paddingTop: 16,
                borderTop: "1px solid var(--border-dark)",
              }}
            >
              <span>Total</span>
              <span style={{ color: "var(--primary-light)" }}>
                R {total.toFixed(2)}
              </span>
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: "rgba(192, 57, 43, 0.1)",
                border: "1px solid var(--danger)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--danger)",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              marginTop: 24,
              padding: 16,
              background: submitting ? "var(--text-soft)" : "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
              cursor: submitting ? "wait" : "pointer",
              boxShadow: "0 4px 24px rgba(181, 56, 143, 0.4)",
            }}
          >
            {submitting
              ? "Placing order..."
              : `Place Order · R ${total.toFixed(0)}`}
          </button>
        </div>
      </form>

      <style jsx global>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-fields {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 900,
          marginBottom: 16,
          letterSpacing: -0.3,
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 10,
          color: "var(--text-soft)",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: 800,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--primary)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        color: color || "var(--text-muted)",
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
};
