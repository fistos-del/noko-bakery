"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ReceiptItem {
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface ThermalReceiptProps {
  orderNumber: string;
  items: ReceiptItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  type: "DELIVERY" | "COLLECTION";
  address?: string;
  paymentMethod: "CARD" | "EFT" | "QR";
  createdAt: Date;
}

const PAYMENT_LABELS = {
  CARD: "Card",
  EFT: "Instant EFT",
  QR: "QR Code",
};

export default function ThermalReceipt({
  orderNumber,
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  type,
  address,
  paymentMethod,
  createdAt,
}: ThermalReceiptProps) {
  const [phase, setPhase] = useState(0);
  // 0: printer idle
  // 1: paper starts emerging
  // 2: paper fully out, content printing
  // 3: complete

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const date = new Date(createdAt);
  const dateStr = date.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        width: "100%",
      }}
    >
      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "var(--primary)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            margin: "0 auto 16px",
            boxShadow:
              "0 8px 24px rgba(181, 56, 143, 0.4), 0 0 0 8px rgba(181, 56, 143, 0.1)",
          }}
        >
          ✓
        </motion.div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: -0.5,
            marginBottom: 6,
          }}
        >
          Order confirmed
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {type === "DELIVERY"
            ? "We'll deliver in 2 days"
            : "Collect from Mooikloof Glen, 8–10am"}
        </p>
      </motion.div>

      {/* Thermal printer */}
      <div
        style={{
          position: "relative",
          width: 340,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Paper emerges from this slot */}
        <div
          style={{
            position: "relative",
            width: 300,
            zIndex: 2,
            marginBottom: -12,
            maxHeight: phase >= 1 ? 1000 : 0,
            overflow: "hidden",
            transition: "max-height 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Receipt paper */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: phase >= 1 ? 0 : -20,
              opacity: phase >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
            style={{
              background: "#FBF8F1",
              color: "#2B2B2B",
              padding: "24px 20px 40px",
              fontFamily:
                "'Courier New', ui-monospace, SFMono-Regular, monospace",
              fontSize: 11,
              lineHeight: 1.6,
              borderTop: "2px dashed #B8A0B3",
              boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
          >
            {/* Perforated top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background:
                  "repeating-linear-gradient(90deg, #B8A0B3 0 6px, transparent 6px 12px)",
              }}
            />

            {/* Content — each line appears as phase progresses */}
            <ReceiptLine phase={phase} delay={0}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 3,
                }}
              >
                NOKO
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  letterSpacing: 2,
                  marginBottom: 12,
                }}
              >
                ARTISAN BAKERY
              </div>
              <div style={{ textAlign: "center", fontSize: 9 }}>
                Mooikloof Glen · Pretoria East
              </div>
            </ReceiptLine>

            <Divider phase={phase} delay={100} />

            <ReceiptLine phase={phase} delay={200}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Order</span>
                <span style={{ fontWeight: 700 }}>#{orderNumber}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Date</span>
                <span>
                  {dateStr} · {timeStr}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Type</span>
                <span style={{ fontWeight: 700 }}>
                  {type === "DELIVERY" ? "Delivery" : "Collection"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Payment</span>
                <span>{PAYMENT_LABELS[paymentMethod]}</span>
              </div>
            </ReceiptLine>

            <Divider phase={phase} delay={400} />

            <ReceiptLine phase={phase} delay={500}>
              {items.map((item, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#7A7A7A",
                      fontSize: 10,
                    }}
                  >
                    <span>
                      {item.quantity} × R{item.unitPrice.toFixed(2)}
                    </span>
                    <span>R {item.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </ReceiptLine>

            <Divider phase={phase} delay={1200} />

            <ReceiptLine phase={phase} delay={1400}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>R {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{type === "DELIVERY" ? "Delivery" : "Collection"}</span>
                <span>
                  {deliveryFee > 0 ? `R ${deliveryFee.toFixed(2)}` : "Free"}
                </span>
              </div>
              {discount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#2E7D32",
                  }}
                >
                  <span>Discount (NOKO20)</span>
                  <span>− R {discount.toFixed(2)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid #B8A0B3",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                <span>TOTAL</span>
                <span>R {total.toFixed(2)}</span>
              </div>
            </ReceiptLine>

            {address && (
              <ReceiptLine phase={phase} delay={1700}>
                <Divider phase={phase} delay={1650} />
                <div style={{ fontSize: 9, color: "#7A7A7A", marginBottom: 2 }}>
                  DELIVER TO
                </div>
                <div style={{ fontSize: 11 }}>{address}</div>
              </ReceiptLine>
            )}

            <ReceiptLine phase={phase} delay={2000}>
              <Divider phase={phase} delay={1950} />
              <div
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  lineHeight: 1.8,
                  color: "#7A7A7A",
                }}
              >
                Thank you for your order!
                <br />
                Questions? WhatsApp us.
                <br />
                noko.co.za
              </div>
            </ReceiptLine>

            {/* Perforated bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 12,
                background:
                  "repeating-linear-gradient(90deg, transparent 0 6px, #B8A0B3 6px 12px)",
                opacity: 0.3,
              }}
            />
          </motion.div>
        </div>

        {/* Printer body */}
        <div
          style={{
            position: "relative",
            width: 340,
            height: 100,
            background: "linear-gradient(180deg, #4A2F46 0%, #2A1B2D 100%)",
            borderRadius: "12px 12px 16px 16px",
            boxShadow:
              "0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(255, 255, 255, 0.05) inset",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Paper slot */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 30,
              right: 30,
              height: 6,
              background: "#1A0F1F",
              borderRadius: 3,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6) inset",
            }}
          />

          {/* Brand strip */}
          <div
            style={{
              marginTop: 20,
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 4,
              color: "var(--primary-light)",
            }}
          >
            NOKO
          </div>

          {/* LED indicator */}
          <motion.div
            animate={{
              opacity: phase === 1 || phase === 2 ? [1, 0.3, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: phase === 1 || phase === 2 ? Infinity : 0,
            }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: phase >= 3 ? "#4ADE80" : "#F59E0B",
              marginTop: 8,
              boxShadow:
                phase >= 3
                  ? "0 0 8px #4ADE80"
                  : "0 0 8px rgba(245, 158, 11, 0.6)",
            }}
          />
        </div>

        {/* Shadow under printer */}
        <div
          style={{
            width: 280,
            height: 12,
            background:
              "radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%)",
            marginTop: -4,
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Completion hint */}
      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: 24,
            fontSize: 11,
            color: "var(--text-soft)",
            letterSpacing: 1,
            textTransform: "uppercase",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Save this for your records ✂️
        </motion.div>
      )}
    </div>
  );
}

function ReceiptLine({
  phase,
  delay,
  children,
}: {
  phase: number;
  delay: number;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (phase >= 2) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [phase, delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}

function Divider({ phase, delay }: { phase: number; delay: number }) {
  return (
    <ReceiptLine phase={phase} delay={delay}>
      <div
        style={{
          borderTop: "1px dashed #B8A0B3",
          margin: "12px 0",
          opacity: 0.6,
        }}
      />
    </ReceiptLine>
  );
}
