"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
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
        const data = await res.json();
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
        background: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        overflow: "hidden", // Keeps the giant logo from creating scrollbars
      }}
    >
      {/* 
        THE CINEMATIC BLURRED LOGO 
        We use a fixed, full-screen flex container to guarantee dead-center positioning.
      */}
      <div
        style={{
          position: "fixed",
          inset: 0, // top: 0, right: 0, bottom: 0, left: 0
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }} // Increased opacity for visibility
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(300px, 40vw, 800px)",
            color: "var(--primary)", // Noko Orange
            filter: "blur(20px)", // Blur effect
            whiteSpace: "nowrap",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          Noko
        </motion.div>
      </div>

      {/* LOGIN FORM CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ 
          position: "relative", 
          width: "100%", 
          maxWidth: 440, 
          textAlign: "center", 
          zIndex: 10, // Form sits above the logo
        }}
      >
        
        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: -1,
            marginBottom: 8,
            color: "var(--text)",
            textTransform: "uppercase",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 40,
          }}
        >
          Log in to see your orders and subscriptions
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: 40,
            background: "#FFFFFF", // Solid white card
            border: "1px solid #E5E5E5",
            borderRadius: 16,
            textAlign: "left",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)", // Deep shadow to separate from logo
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontWeight: 800,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#F9F9F9",
                border: "1px solid #E5E5E5",
                borderRadius: 8,
                color: "var(--text)",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "inherit",
                outline: "none",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontWeight: 800,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#F9F9F9",
                border: "1px solid #E5E5E5",
                borderRadius: 8,
                color: "var(--text)",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "inherit",
                outline: "none",
              }}
              required
            />
          </div>

          {error && (
            <div
              style={{
                padding: 12,
                background: "rgba(255, 69, 0, 0.1)",
                border: "1px solid #FF4500",
                borderRadius: 8,
                fontSize: 12,
                color: "#FF4500",
                fontWeight: 600,
                marginBottom: 20,
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
              background: submitting ? "#CCCCCC" : "var(--primary)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
              cursor: submitting ? "wait" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {submitting ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <p
          style={{
            marginTop: 32,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          New here?{" "}
          <Link
            href="/register"
            style={{ color: "var(--primary)", fontWeight: 700 }}
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
