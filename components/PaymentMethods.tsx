"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentMethods({ orderId, total }: { orderId: string; total: number }) {
  const router = useRouter();
  const [method, setMethod] = useState<"CARD" | "EFT" | "QR" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const pay = async () => {
    if (!method) return;
    setProcessing(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Payment failed");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {error && <div style={{ padding: 12, background: "#fee", color: "#900", borderRadius: 8, fontSize: 14 }}>{error}</div>}

      {/* Card */}
      <button
        onClick={() => setMethod("CARD")}
        style={{ padding: 20, border: `2px solid ${method === "CARD" ? "var(--brand-plum)" : "var(--border)"}`, borderRadius: 12, background: "var(--surface)", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>💳 Card</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Visa, Mastercard</div>
      </button>

      {/* EFT */}
      <button
        onClick={() => setMethod("EFT")}
        style={{ padding: 20, border: `2px solid ${method === "EFT" ? "var(--brand-plum)" : "var(--border)"}`, borderRadius: 12, background: "var(--surface)", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>🏦 Instant EFT</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Bank transfer</div>
      </button>

      {/* QR */}
      <button
        onClick={() => setMethod("QR")}
        style={{ padding: 20, border: `2px solid ${method === "QR" ? "var(--brand-plum)" : "var(--border)"}`, borderRadius: 12, background: "var(--surface)", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>📱 QR Code</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Scan to pay</div>
      </button>

      {method === "QR" && (
        <div style={{ padding: 32, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 8 }}>📱</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            (QR code placeholder — scan with your banking app)
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Amount: R {total.toFixed(2)}</p>
        </div>
      )}

      <button
        onClick={pay}
        disabled={!method || processing}
        style={{ padding: 18, background: method ? "var(--brand-plum)" : "var(--border)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, cursor: method && !processing ? "pointer" : "not-allowed", marginTop: 8 }}
      >
        {processing ? "Processing..." : method ? `Pay R ${total.toFixed(2)} via ${method}` : "Select a payment method"}
      </button>

      <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 8 }}>
        This is a simulated payment for now. Real gateway (PayFast) will be added later.
      </p>
    </div>
  );
}
