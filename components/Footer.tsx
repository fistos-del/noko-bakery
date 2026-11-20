import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-alt)",
      borderTop: "1px solid var(--border)",
      padding: "4rem 1.5rem 2rem",
      marginTop: "auto",
      width: "100%",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2.5rem",
      }}>
        {/* Brand */}
        <div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>NOKO</h2>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem", color: "var(--text-muted)" }}>Artisan Bakery</p>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", marginTop: "1.25rem" }}>
            Handmade breads, pastries, and curated boxes<br />
            delivered fresh to Pretoria East. Made with care,<br />
            baked with love.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>Shop</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><Link href="/shop" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>All Products</Link></li>
            <li><Link href="/subscribe" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Subscribe & Save</Link></li>
            <li><Link href="/delivery" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Delivery Info</Link></li>
            <li><Link href="/account" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>My Account</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>Info</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>R25 flat delivery fee</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>15–20km radius</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>Collection 8–10am</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>Allergens: Gluten, Dairy, Egg</p>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>Contact</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>Mooikloof Glen Country Estate</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>Corner Garsfontein Rd & Topaz Crescent</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.4rem" }}>Pretoria East</p>
          <a href="https://wa.me/27000000000" target="_blank" rel="noreferrer" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.75rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}>
            <span style={{ color: "#b8a4c9" }}>💬</span> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: "1200px",
        margin: "3rem auto 0",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        fontSize: "0.8rem",
        color: "var(--text-muted)",
      }}>
        <p style={{ margin: 0 }}>© 2026 Noko Bakery. All rights reserved.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Terms of Sale</Link>
          <Link href="/popia" style={{ color: "var(--text-muted)", textDecoration: "none" }}>POPIA Compliant</Link>
        </div>
      </div>
    </footer>
  );
}
