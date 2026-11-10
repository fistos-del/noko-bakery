import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "Jorud Solutions cc — Civil, Horticulture & Logistics",
    template: "%s | Jorud Solutions",
  },
  description:
    "Jorud Solutions cc — Building South Africa since 1999. Civil & general construction, horticulture, steel engineering, and logistics. CIDB & NHBRC registered. Level 3 B-BBEE. 100% black-owned.",
  keywords: [
    "Jorud Solutions",
    "civil construction",
    "general building",
    "horticulture",
    "steel engineering",
    "logistics",
    "South Africa",
    "Pretoria",
    "CIDB",
    "NHBRC",
    "B-BBEE Level 3",
  ],
  authors: [{ name: "Jorud Solutions cc" }],
  metadataBase: new URL("https://jorudsolution.co.za"),
  openGraph: {
    title: "Jorud Solutions cc — Multi-Disciplinary Construction",
    description:
      "Civil, horticulture, steel, and logistics. Building South Africa since 1999. CIDB & NHBRC registered.",
    url: "https://jorudsolution.co.za",
    siteName: "Jorud Solutions",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Jorud Solutions cc",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFloat />
      </body>
    </html>
  );
}