"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const PLANS: Record<string, { name: string; pricePerWeek: number; icon: string; description: string }> = {
  standard: { name: "Standard Box", pricePerWeek: 150, icon: "🥖", description: "Bread Box every week" },
  premium: { name: "Premium Box", pricePerWeek: 200, icon: "🥐", description: "Pastry Box every week" },
  family: { name: "Family Box", pricePerWeek: 225, icon: "🥨", description: "Mix Box every week" },
};

export default function SubscribePage() {
  const router = useRouter();
  const params = useParams();
  const planKey = (params.plan as string)?.toLowerCase() || "";
  const plan = PLANS[planKey];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!plan) {
    return (
      <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, maxWidth: 500, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--brand-plum)", marginBottom: 16 }}>Plan not found</h1>
          <p style={{ color: "var(--brand-plum)", opacity: 0.8, marginBottom: 24 }}>That subscription plan doesn&apos;t exist.</p>
          <Link href="/subscription" style={{ display: "inline-block", padding: "14px 28px", background: "var(--brand-plum)", color: "white", textDecoration: "none", borderRadius: 8, fontWeight: 800 }}>
            View all plans
          </Link>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.push("/account");
          return;
        }
        throw new Error(data.error || "Failed to subscribe");
      }

      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px" }}>
        <Link href="/subscription" style={{ fontSize: 13, color: "var(--brand-plum)", textDecoration: "none", opacity: 0.8 }}>
          &larr; Back to plans
        </Link>

        <div style={{ marginTop: 24, background: "white", borderRadius: 16, padding: 40, boxShadow: "0 10px 30px rgba(100,28,64,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{plan.icon}</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "var(--brand-plum)", marginBottom: 8 }}>
              {plan.name}
            </h1>
            <p style={{ fontSize: 16, color: "var(--brand-plum)", opacity: 0.8 }}>
              {plan.description}
            </p>
          </div>

          <div style={{ background: "var(--brand-muted)", borderRadius: 12, padding: 24, marginBottom: 32, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "var(--brand-plum)", opacity: 0.8, marginBottom: 4 }}>
              Weekly subscription
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "var(--brand-plum)" }}>
              R {plan.pricePerWeek}
              <span style={{ fontSize: 16, opacity: 0.7, fontWeight: 600 }}> / week</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--brand-plum)", opacity: 0.8, marginTop: 12 }}>
              Your first box will be scheduled for delivery 3 days from today.
            </div>
          </div>

          {error && (
            <div style={{ padding: 12, background: "rgba(220,38,38,0.1)", border: "1px solid #dc2626", borderRadius: 8, fontSize: 13, color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            style={{
              width: "100%",
              padding: 18,
              background: loading ? "#a08a94" : "var(--brand-plum)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 1,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Creating subscription..." : `Confirm Subscription · R ${plan.pricePerWeek}/week`}
          </button>

          <p style={{ fontSize: 12, color: "var(--brand-plum)", opacity: 0.6, textAlign: "center", marginTop: 16 }}>
            You can cancel any time from your account.
          </p>
        </div>
      </div>
    </div>
  );
}
