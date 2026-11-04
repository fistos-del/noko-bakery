"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "10px 20px",
        background: "transparent",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        cursor: loading ? "wait" : "pointer",
      }}
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
