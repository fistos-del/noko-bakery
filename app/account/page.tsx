"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--brand-bg)",
        padding: 24,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -100,
          background: "var(--brand-muted)",
          opacity: 0.2,
          filter: "blur(100px)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "var(--brand-plum)",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--brand-plum)",
              opacity: 0.8,
              marginTop: 8,
            }}
          >
            Log in to see your orders and subscriptions
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 800,
                color: "var(--brand-plum)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 8,
                border: "1px solid rgba(100,28,64,0.2)",
                background: "white",
                color: "var(--brand-plum)",
                fontSize: 14,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 800,
                color: "var(--brand-plum)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 8,
                border: "1px solid rgba(100,28,64,0.2)",
                background: "white",
                color: "var(--brand-plum)",
                fontSize: 14,
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: 12,
                background: "rgba(220, 38, 38, 0.1)",
                border: "1px solid #dc2626",
                borderRadius: 8,
                fontSize: 12,
                color: "#dc2626",
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
              padding: 16,
              background: submitting ? "#a08a94" : "var(--brand-plum)",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginTop: 8,
              cursor: submitting ? "wait" : "pointer",
            }}
          >
            {submitting ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 13,
            color: "var(--brand-plum)",
            opacity: 0.8,
          }}
        >
          New here?{" "}
          <Link
            href="/register"
            style={{
              color: "var(--brand-plum)",
              fontWeight: 800,
              textDecoration: "underline",
            }}
          >
            Create an account.
          </Link>
        </div>
      </div>
    </div>
  );
}
