import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Hyamatla Organics — Organic Fertilizer from Water Hyacinth",
    template: "%s | Hyamatla Organics",
  },
  description:
    "Hya Power Organic Fertilizer — harvested from invasive water hyacinth and mineralised into a powerful 100% organic fertilizer. 16 nutrients, single application, ECOCERT inspected. Bulk orders for commercial farms and co-ops across South Africa.",
  keywords: [
    "organic fertilizer",
    "water hyacinth",
    "Hya Power",
    "Hyamatla Organics",
    "South Africa",
    "organic farming",
    "sustainable agriculture",
    "Hartbeespoort Dam",
    "ECOCERT",
  ],
  authors: [{ name: "Hyamatla Organics" }],
  metadataBase: new URL("https://www.hyamatlaorganics.co.za"),
  openGraph: {
    title: "Hyamatla Organics — Turning Water's Worst Weed into Africa's Best Soil",
    description:
      "100% organic fertilizer from invasive water hyacinth. 16 nutrients. Single application per season. Bulk orders across South Africa.",
    url: "https://www.hyamatlaorganics.co.za",
    siteName: "Hyamatla Organics",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Hyamatla Organics — Hya Power Organic Fertilizer",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyamatla Organics — Organic Fertilizer from Water Hyacinth",
    description:
      "100% organic fertilizer from invasive water hyacinth. 16 nutrients. Bulk orders across South Africa.",
    images: ["/og-image.svg"],
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
      </body>
    </html>
  );
}