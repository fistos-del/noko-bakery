"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/account", label: "Dashboard", icon: "🏠" },
  { href: "/admin/orders", label: "Orders", icon: "📋" },
  { href: "/admin/products", label: "Products", icon: "🥖" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: "🔄" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F9FA", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(0,0,0,0.05)", padding: "32px 20px", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 110 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 40, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, background: "#111", borderRadius: "50%" }} />
          Noko
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {MENU.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                borderRadius: 12, background: active ? "#111" : "transparent",
                color: active ? "#FFF" : "#666", fontWeight: active ? 600 : 500,
                fontSize: 14, textDecoration: "none", transition: "all 0.2s"
              }}>
                <span>{item.icon}</span> {item.label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Area with Glass Effect */}
      <main style={{ marginLeft: 220, flex: 1, padding: "40px" }}>
        <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", padding: 40, borderRadius: 24, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
