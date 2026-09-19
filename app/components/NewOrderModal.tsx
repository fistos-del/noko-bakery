"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Customer {
  id: string;
  name: string;
  region: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  code: string;
  stockTons: number;
  pricePerTon: number;
}

export default function NewOrderModal({
  open,
  onClose,
  customers,
  products,
}: {
  open: boolean;
  onClose: () => void;
  customers: Customer[];
  products: Product[];
}) {
  const router = useRouter();
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Reset on open
  useEffect(() => {
    if (open) {
      setCustomerId(customers[0]?.id ?? "");
      setProductId(products[0]?.id ?? "");
      setQuantity(1);
      setNotes("");
      setError("");
      const d = new Date();
      d.setDate(d.getDate() + 3);
      setDeliveryDate(d.toISOString().split("T")[0]);
      const firstCustomer = customers[0];
      setDeliveryAddress(firstCustomer?.address ?? "");
    }
  }, [open, customers, products]);

  // Update delivery address when customer changes
  useEffect(() => {
    const cust = customers.find((c) => c.id === customerId);
    if (cust) setDeliveryAddress(cust.address);
  }, [customerId, customers]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const selectedProduct = products.find((p) => p.id === productId);
  const totalValue = selectedProduct
    ? quantity * selectedProduct.pricePerTon
    : 0;
  const insufficientStock =
    selectedProduct && quantity > selectedProduct.stockTons;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerId || !productId || quantity <= 0) {
      setError("Please fill in all required fields");
      return;
    }

    if (insufficientStock) {
      setError(`Only ${selectedProduct?.stockTons}t available in stock`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          productId,
          quantityTons: quantity,
          deliveryDate,
          deliveryAddress,
          notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create order");
      }

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(15, 22, 17, 0.75)",
          backdropFilter: "blur(6px)",
          animation: "modalFadeIn 0.2s ease-out",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          width: "min(600px, calc(100vw - 32px))",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
          animation: "modalSlideUp 0.25s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "var(--surface)",
            zIndex: 1,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--secondary)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              New Order
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: -0.3,
              }}
            >
              Create Hya Power Order
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 8,
              width: 36,
              height: 36,
              cursor: "pointer",
              color: "var(--text)",
              fontSize: 18,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <Field label="Customer" required>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              style={selectStyle}
              required
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.region}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Product" required>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              style={selectStyle}
              required
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.stockTons}t in stock
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quantity (tons)" required>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                type="number"
                min={0.5}
                step={0.5}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ ...inputStyle, flex: 1 }}
                required
              />
              <div
                style={{
                  fontSize: 11,
                  color: insufficientStock
                    ? "var(--danger)"
                    : "var(--text-soft)",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  letterSpacing: 0.5,
                }}
              >
                Max: {selectedProduct?.stockTons ?? 0}t
              </div>
            </div>
            {insufficientStock && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--danger)",
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                ⚠️ Not enough stock — reduce quantity
              </div>
            )}
          </Field>

          <Field label="Delivery Date" required>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              style={inputStyle}
              required
            />
          </Field>

          <Field label="Delivery Address">
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              style={inputStyle}
              placeholder="Auto-filled from customer"
            />
          </Field>

          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="e.g., Call on arrival. Split delivery."
            />
          </Field>

          <div
            style={{
              padding: 16,
              background: "var(--surface-2)",
              borderRadius: 10,
              marginTop: 8,
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-soft)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Order Total
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "var(--primary)",
                  letterSpacing: -0.5,
                }}
              >
                R {totalValue.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              <div>
                {quantity}t × R {selectedProduct?.pricePerTon.toLocaleString()}
                /t
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: 12,
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid var(--danger)",
                borderRadius: 8,
                color: "var(--danger)",
                fontSize: 13,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              style={{
                flex: 1,
                padding: "14px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text)",
                fontSize: 14,
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.5 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                submitting || insufficientStock || !customerId || !productId
              }
              style={{
                flex: 2,
                padding: "14px",
                background:
                  submitting || insufficientStock
                    ? "var(--surface-3)"
                    : "var(--primary)",
                border: "none",
                borderRadius: 10,
                color:
                  submitting || insufficientStock
                    ? "var(--text-soft)"
                    : "#0F1611",
                fontSize: 14,
                fontWeight: 800,
                cursor:
                  submitting || insufficientStock
                    ? "not-allowed"
                    : "pointer",
                transition: "all 0.2s",
              }}
            >
              {submitting ? "Creating..." : "Create Order →"}
            </button>
          </div>
        </form>
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
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
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "var(--text-soft)",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--secondary)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};