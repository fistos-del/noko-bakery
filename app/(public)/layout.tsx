import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main style={{ minHeight: "60vh", paddingTop: 60 }}>{children}</main>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
}
