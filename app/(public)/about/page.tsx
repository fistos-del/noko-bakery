export default function AboutPage() {
  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, marginBottom: 40, color: "var(--brand-plum)" }}>
          A little about the hands behind the bakes.
        </h1>

        <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)", display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            Rooted in a love for patisserie and the art of creating something from scratch, this bakery is inspired by the beauty of good ingredients, thoughtful craftsmanship and the comfort something delicious can bring.
          </p>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            With a background in patisserie, the hands behind the bakery have a real appreciation for creativity, technique and detail that goes into every bake. The aim is to bring together classic foundations with a fresh, contemporary approach, creating thoughtful and creative menu offerings that feel comforting and a little unexpected.
          </p>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            Every creation is made with care, curiosity and genuine love for the craft. More than just something sweet, the hope is to create moments of warmth, happiness and goodness through the things we make and share.
          </p>
          <p style={{ fontSize: 18, fontWeight: 800, color: "var(--brand-plum)", marginTop: 16 }}>
            A little creativity and a whole lot of heart. From our kitchen to yours. Rooted in culture and living:)
          </p>
        </div>

        <div style={{ marginTop: 60 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--brand-plum)", marginBottom: 24 }}>Contact</h2>
          <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 16, color: "var(--brand-plum)" }}>📞 +27 63 974 0143</p>
            <p style={{ fontSize: 16, color: "var(--brand-plum)" }}>Email: <a href="mailto:bynokobakery@gmail.com" style={{ color: "var(--brand-plum)", fontWeight: 800, textDecoration: "underline" }}>bynokobakery@gmail.com</a></p>
            <p style={{ fontSize: 16, color: "var(--brand-plum)" }}>Instagram: <a href="https://instagram.com/noko.bakery" target="_blank" rel="noreferrer" style={{ color: "var(--brand-plum)", fontWeight: 800, textDecoration: "underline" }}>@noko.bakery</a></p>
          </div>
        </div>

      </div>
    </div>
  );
}
