"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/inventory", label: "Inventory", icon: "📦" },
  { href: "/orders", label: "Orders", icon: "📋" },
  { href: "/deliveries", label: "Deliveries", icon: "🚚" },
  { href: "/customers", label: "Customers", icon: "👥" },
  { href: "/reports", label: "Reports", icon: "📈" },
];

// 5 main tabs for mobile bottom nav
const MOBILE_TABS = [
  { href: "/", label: "Home", icon: "📊" },
  { href: "/inventory", label: "Stock", icon: "📦" },
  { href: "/orders", label: "Orders", icon: "📋" },
  { href: "/deliveries", label: "Deliver", icon: "🚚" },
  { href: "/reports", label: "Reports", icon: "📈" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="desktop-sidebar"
        style={{
          width: 240,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: "20px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          minHeight: "100vh",
          flexShrink: 0,
        }}
      >
                <div style={{ padding: "8px 12px 20px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--secondary)",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Hyamatla
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--primary)",
              letterSpacing: -0.3,
            }}
          >
            FertiTrack
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-soft)",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            Stock & Order Management
          </div>
        </div>

        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
                background: active
                  ? "var(--surface-2)"
                  : "transparent",
                color: active
                  ? "var(--text)"
                  : "var(--text-muted)",
                borderLeft: active
                  ? "3px solid var(--primary)"
                  : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}

                <div
          style={{
            marginTop: "auto",
            padding: 12,
            fontSize: 11,
            color: "var(--text-soft)",
            borderTop: "1px solid var(--border)",
            paddingTop: 16,
          }}
        >
          <div style={{ color: "var(--primary)", fontWeight: 700, marginBottom: 2 }}>
            Hya Power Operations
          </div>
          <div>v1.0 · 2025</div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        {MOBILE_TABS.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "8px 4px",
                color: active
                  ? "var(--primary-light)"
                  : "var(--text-muted)",
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                position: "relative",
                transition: "color 0.2s",
              }}
            >
              {active && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 32,
                    height: 3,
                    background: "var(--primary-light)",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              )}

              <span
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                {tab.icon}
              </span>

              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <style jsx global>{`
        .mobile-bottom-nav {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-sidebar {
            display: none !important;
          }

          .mobile-bottom-nav {
            display: flex !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 68px;
            background: var(--surface);
            border-top: 1px solid var(--border);
            z-index: 100;
            padding-bottom: env(
              safe-area-inset-bottom,
              0
            );
          }

          /* Add padding so content isn't hidden behind the nav */
          body {
            padding-bottom: 68px;
          }
        }
      `}</style>
    </>
  );
}