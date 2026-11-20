import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "2rem",
          borderTop: "2px solid var(--primary)",
          paddingTop: "1.5rem",
        }}>
          About Noko Bakery
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Noko Bakery is a small-batch artisan bakery rooted in Pretoria East. We
          hand-shape every loaf, slow-ferment our doughs, and bake fresh every
          morning.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          From sourdough and focaccia to buttery croissants and curated boxes, our
          menu is built around local ingredients and traditional techniques.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
          We deliver within a 15–20km radius of Mooikloof Glen Country Estate, and
          offer collection between 8–10am. Allergens: Gluten, Dairy, Egg.
        </p>
        <Link href="/shop" style={{
          display: "inline-block",
          background: "var(--primary)",
          color: "#fff",
          padding: "0.85rem 2rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}>
          Browse the Shop
        </Link>
      </div>
    </div>
  );
}
