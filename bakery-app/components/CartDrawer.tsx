"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCart();

  const deliveryFee = items.length > 0 ? 25 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(15, 8, 15, 0.7)",
            backdropFilter: "blur(6px)",
            animation: "cartBackdropIn 0.25s ease-out",
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(440px, 100vw)",
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 301,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              Your Order
            </div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              Cart ({items.length})
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 8,
              width: 36,
              height: 36,
              color: "var(--text)",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 60, marginBottom: 20, opacity: 0.5 }}>
                🛒
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "var(--text)",
                }}
              >
                Your cart is empty
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginBottom: 28,
                }}
              >
                Add some fresh bread or pastries to get started
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  background: "var(--primary)",
                  color: "white",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                Shop Now →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--border-dark)",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      background: "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      flexShrink: 0,
                    }}
                  >
                    🥖
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        marginBottom: 4,
                        color: "var(--text)",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginBottom: 8,
                      }}
                    >
                      R {item.price.toFixed(2)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        style={qtyBtnStyle}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          minWidth: 24,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        style={qtyBtnStyle}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          marginLeft: "auto",
                          background: "transparent",
                          border: "none",
                          color: "var(--text-soft)",
                          fontSize: 11,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--primary-light)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    R {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div
            style={{
              padding: 24,
              borderTop: "1px solid var(--border)",
              background: "var(--surface-2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              <span>Subtotal</span>
              <span>R {subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 16,
              }}
            >
              <span>Delivery fee</span>
              <span>R {deliveryFee.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 18,
                fontWeight: 900,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                marginBottom: 20,
              }}
            >
              <span>Total</span>
              <span style={{ color: "var(--primary-light)" }}>
                R {total.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                background: "var(--primary)",
                color: "white",
                borderRadius: 10,
                textAlign: "center",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(181, 56, 143, 0.3)",
              }}
            >
              Checkout →
            </Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes cartBackdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  border: "1px solid var(--border)",
  background: "var(--surface)",
  borderRadius: 6,
  color: "var(--text)",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
