import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ background: "var(--brand-bg)", minHeight: "100vh", color: "white" }}>
      
      {/* 1. HERO SECTION */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(120px, 22vw, 320px)",
            color: "var(--brand-light)",
            lineHeight: 0.85,
            margin: 0,
            fontWeight: 400,
            letterSpacing: -4,
          }}
        >
          Noko
        </h1>

        <p
          style={{
            fontSize: "clamp(12px, 1.5vw, 16px)",
            fontWeight: 500,
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: 6,
            marginTop: 24,
            marginBottom: 48,
          }}
        >
          Rooted in culture and living
        </p>

        <Link
          href="/shop"
          style={{
            display: "inline-block",
            padding: "18px 48px",
            background: "var(--brand-muted)",
            color: "white",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 4,
          }}
        >
          Shop Now
        </Link>
      </section>

      {/* 2. BETTER INGREDIENTS SECTION */}
      <section
        style={{
          padding: "120px 5vw",
          background: "var(--brand-muted)", // #D5B1B8
          color: "var(--brand-plum)", // #641C40
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.1 }}>
              Better Ingredients.<br/>Better Flavor.
            </h2>
            <p style={{ fontSize: 18, maxWidth: 600, margin: "0 auto", opacity: 0.9 }}>
              We source only the finest local ingredients. Slow-fermented, hand-shaped, and baked to perfection every single morning.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60, alignItems: "center", textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                 <div style={{ width: 80, height: 120, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, transform: `rotate(-5deg)`, borderRadius: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>🥖</div>
                 <div style={{ width: 80, height: 120, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, borderRadius: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>🥐</div>
                 <div style={{ width: 80, height: 120, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, transform: `rotate(5deg)`, borderRadius: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>🥨</div>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 16 }}>BEST SELLERS</h3>
              <Link href="/shop" style={{ padding: "12px 24px", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, textDecoration: "none", background: "var(--brand-plum)", color: "white", borderRadius: 4 }}>
                Shop All
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
