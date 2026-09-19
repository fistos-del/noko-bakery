import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import RouteProgress from "@/components/RouteProgress";

export const metadata: Metadata = {
  title: {
    default: "Hyamatla FertiTrack — Stock & Order Management",
    template: "%s | Hyamatla FertiTrack",
  },
  description:
    "Internal operations dashboard for Hyamatla Organics — track Hya Power fertilizer stock, orders, deliveries, and customers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
            <body>
        <RouteProgress />
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <main style={{ flex: 1, padding: 24, overflow: "auto" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}