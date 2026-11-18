import Link from "next/link";

export default function AdminNav() {
  const items = [
    { href: "/admin/orders", label: "ORDERS" },
    { href: "/admin/products", label: "PRODUCTS" },
    { href: "/admin/customers", label: "CUSTOMERS" },
    { href: "/admin/subscriptions", label: "SUBSCRIPTIONS" },
    { href: "/admin/reports", label: "REPORTS" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} style={{
          display: "block", padding: "16px 20px",
          background: "var(--admin-surface)", border: "1px solid var(--admin-border)",
          color: "var(--admin-text)", textDecoration: "none",
          fontSize: 13, fontWeight: 900, fontFamily: "var(--font-mono)", letterSpacing: 1,
        }}>
          &gt; {item.label}
        </Link>
      ))}
    </div>
  );
}
