import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: 500, textAlign: "center" }}>
        <div
          style={{
            fontSize: 80,
            lineHeight: 1,
            marginBottom: 20,
            filter: "drop-shadow(0 0 30px rgba(74, 124, 89, 0.3))",
          }}
        >
          🧭
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--accent)",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          404 · Page not found
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: -0.5,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          This page doesn&apos;t exist
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Check the URL or head back to the dashboard.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "var(--primary)",
            color: "white",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}