"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Cancel this subscription? You won't receive further boxes.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/subscriptions/${id}/cancel`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to cancel");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to cancel");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      style={{ padding: "10px 20px", background: "transparent", color: "#dc2626", border: "1px solid #dc2626", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: loading ? "wait" : "pointer" }}
    >
      {loading ? "Cancelling..." : "Cancel subscription"}
    </button>
  );
}
