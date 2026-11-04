"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  quantity?: number;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export default function AddToCartButton({
  productId,
  name,
  price,
  quantity = 1,
  variant = "primary",
  fullWidth = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    addItem({ id: productId, name, price }, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const isPrimary = variant === "primary";

  return (
    <>
      <motion.button
        onClick={handleAdd}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: fullWidth ? "100%" : "auto",
          padding: "16px 32px",
          background: isPrimary ? "var(--primary)" : "transparent",
          color: isPrimary ? "white" : "var(--text)",
          border: isPrimary ? "none" : "1px solid var(--border)",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 900,
          letterSpacing: 1,
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: isPrimary ? "0 4px 24px rgba(181, 56, 143, 0.4)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span>🛒</span>
        Add to Cart · R {(price * quantity).toFixed(0)}
      </motion.button>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 500,
              padding: "14px 22px",
              background: "var(--surface)",
              border: "1px solid var(--primary)",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(181, 56, 143, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              ✓
            </span>
            <span>{name} added to cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
