export default function FaqPage() {
  const faqs = [
    { q: "Do you have a fixed menu?", a: "Our menu changes with the seasons! We offer a carefully curated selection of baked goods, with certain favorites making regular appearances alongside new and seasonal creations. Keep an eye on our menu and social media to see what’s on the rise;)" },
    { q: "Can I request a specific item or place a custom order?", a: "At the moment, we work exclusively with our selected menu and seasonal offerings, so we’re unable to accommodate custom orders. We love keeping things fresh so there’s always something delicious to look forward to!" },
    { q: "Can I request substitutions in my box?", a: "As our menu and bakery boxes are carefully planned in advance, we’re unfortunately unable to accommodate individual substitutions or changes to selected items." },
    { q: "Do you accept large orders?", a: "Absolutely! We welcome large orders for gatherings, celebrations, events and special occasions. While we don’t offer custom items, we’re happy to accommodate larger quantities of items from our available menu, subject to availability and sufficient notice. For larger orders, please get in touch with us directly so we can discuss quantities, availability and arrangements." },
    { q: "Can I cancel or change my order?", a: "We understand plans change! Should you wish to cancel or make a change to your order, please ensure that you notify us at least 24 hours before your scheduled collection or delivery time. Cancellations or changes requested with less than 24 hours’ notice will only be eligible for a 50% partial refund of the order total. Please note that any changes are subject to availability and cannot be guaranteed once your order has entered preparation. Please contact us as soon as possible if you need assistance with existing orders." },
  ];

  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, marginBottom: 40, color: "var(--brand-plum)" }}>
          Frequently Asked Questions
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 10px 30px rgba(100,28,64,0.05)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--brand-plum)", marginBottom: 12 }}>{faq.q}</h3>
              <p style={{ fontSize: 15, color: "var(--brand-plum)", lineHeight: 1.7, opacity: 0.9 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
