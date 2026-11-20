import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 5vw" }}>

        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, marginBottom: 24, color: "var(--brand-plum)" }}>
            A little something to look forward to
          </h1>
          <p style={{ fontSize: 18, color: "var(--brand-plum)", opacity: 0.9, marginBottom: 16 }}>
            Enjoy a little taste of our bakery on a regular basis with one of our carefully curated bakery boxes.
          </p>
          <p style={{ fontSize: 18, color: "var(--brand-plum)", fontWeight: 800 }}>
            Your favorite bakes, on repeat.
          </p>
        </div>

        <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)", display: "flex", flexDirection: "column", gap: 24, marginBottom: 60 }}>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            Life is a little sweeter with good things to look forward to. Our bakery subscriptions are made for those who love freshly baked treats on hand.
          </p>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            Choose from one of our weekly bakery subscriptions and enjoy a selection of our favorite bakes, thoughtfully chosen from our menu and prepared fresh for your box.
          </p>
          <p style={{ fontSize: 16, color: "var(--brand-plum)", lineHeight: 1.8 }}>
            Whether it&rsquo;s something special for your weekend breakfast, a treat to share with family or simply a little indulgence for yourself, we&rsquo;ve got you covered.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {["Standard Box", "Premium Box", "Family Box"].map((name, i) => (
            <div key={i} style={{ padding: 40, background: "var(--brand-plum)", borderRadius: 16, display: "flex", flexDirection: "column", textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>{["🥖", "🥐", "🥨"][i]}</div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--brand-muted)", marginBottom: 16 }}>{name}</h3>
              <Link href={`/subscribe/${["standard","premium","family"][i]}`} style={{ padding: 16, background: "var(--brand-muted)", color: "var(--brand-plum)", textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", marginTop: "auto" }}>
                Subscribe
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
