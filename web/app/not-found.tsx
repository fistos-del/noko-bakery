import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px 60px",
        background:
          "radial-gradient(circle at 50% 30%, #1A1815 0%, #0F0E0C 70%)",
      }}
    >
      <div style={{ maxWidth: 600, textAlign: "center" }}>
        {/* Animated broken sprout */}
        <div
          style={{
            fontSize: 120,
            lineHeight: 1,
            marginBottom: 24,
            filter: "drop-shadow(0 0 40px rgba(74, 124, 89, 0.3))",
          }}
        >
          🌱
        </div>

        <div
          style={{
            fontSize: 13,
            color: "var(--accent)",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
            fontWeight: 700,
          }}
        >
          404 · Field not found
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          This row hasn&apos;t been{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #4A7C59 0%, #D4A843 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            planted
          </span>{" "}
          yet
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to fertile ground.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "14px 28px",
              background: "var(--primary)",
              color: "white",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← Back to home
          </Link>
          <Link
            href="/#products"
            style={{
              padding: "14px 28px",
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            View products
          </Link>
        </div>
      </div>
    </main>
  );
}