
export default function DeliveryPage() {
  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, marginBottom: 24, color: "var(--brand-plum)" }}>
          Delivery &amp; Collection
        </h1>

        <p style={{ fontSize: 18, color: "var(--brand-plum)", lineHeight: 1.8, marginBottom: 40, opacity: 0.9 }}>
          Whether you&rsquo;d prefer your goodies brought straight to your door or would like to pop by and collect them, we&rsquo;ve made getting your favourites as easy as possible. Choose the option that suits you best and leave the rest to us.
        </p>

        <div style={{ display: "grid", gap: 32 }}>
          <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--brand-plum)", marginBottom: 16 }}>
              Doorstep Delivery
            </h2>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
              We offer local delivery across Pretoria East. Simply select delivery when placing your order, and we&rsquo;ll arrange to get your goods to you.
            </p>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", fontWeight: 800, marginBottom: 16 }}>
              📍 📍 Delivery fee: R25 flat
            </p>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", fontWeight: 800, marginBottom: 16 }}>
              📅 📅 Days: Monday - Saturday
            </p>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", fontWeight: 800, marginBottom: 16 }}>
              🕒 🕒 Hours: 9am - 1pm
            </p>
          </div>

          <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--brand-plum)", marginBottom: 16 }}>
              Collection
            </h2>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
              Prefer to collect? You&rsquo;re more than welcome to! We offer collections from our designated collection point during our allocated collection window, making it easy to pick up your freshly baked order at a time arranged with us.
            </p>

            <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
              Collection details and the exact location will be shared with you once your order has been confirmed. No delivery fee applies to collection.
            </p>

            <ul style={{ listStyle: "none", padding: 0, fontSize: 15, color: "var(--brand-plum)", fontWeight: 700, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>📍 Location: Mooikloof, Garstfontein rd</li>
              <li>📅 📅 📅 Days: Monday - Saturday</li>
              <li>🕒 Hours: 9am - 11am</li>
            </ul>
          </div>
        </div>

        <p style={{ fontSize: 14, color: "var(--brand-plum)", textAlign: "center", marginTop: 40, opacity: 0.7, fontStyle: "italic" }}>
          Your privacy matters. Our exact collection address is not publicly listed on our website. Details are shared privately with confirmed customers to ensure your collection experience is smooth and convenient.
        </p>
      </div>
    </div>
  );
}
