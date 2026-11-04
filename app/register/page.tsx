"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DrawnKey from "@/components/DrawnKey";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [keyVisible, setKeyVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setKeyVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
        background:
          "radial-gradient(circle at 50% 40%, #3A2538 0%, #241625 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          textAlign: "center",
        }}
      >
        <DrawnKey visible={keyVisible} />

        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          Create your account
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            marginBottom: 40,
          }}
        >
          Save time on future orders — we&apos;ll remember your details
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: 32,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="082 000 0000"
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Password (min 6 characters)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              minLength={6}
              required
            />
          </div>

          {error && (
            <div
              style={{
                padding: 12,
                background: "rgba(192, 57, 43, 0.1)",
                border: "1px solid var(--danger)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--danger)",
                fontWeight: 600,
                marginBottom: 16,
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
              padding: 14,
              background: submitting ? "var(--text-soft)" : "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
              cursor: submitting ? "wait" : "pointer",
              boxShadow: "0 4px 24px rgba(181, 56, 143, 0.4)",
            }}
          >
            {submitting ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "var(--primary-light)", fontWeight: 700 }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  color: "var(--text-soft)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 1.2,
  fontWeight: 800,
};

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
