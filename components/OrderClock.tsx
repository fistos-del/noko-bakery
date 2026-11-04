"use client";

import { motion } from "framer-motion";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "BAKING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

interface StatusConfig {
  hour: number; // 0-11 (6am = 0, 9am = 3, 12pm = 6, 3pm = 9, 6pm = 12... wait 6pm = 12 mod 12 = 0? need to remap)
  label: string;
  sublabel: string;
  color: string;
}

const STATUS_MAP: Record<OrderStatus, StatusConfig> = {
  PENDING: {
    hour: 0, // 6am position (12 o'clock on clock face)
    label: "Order received",
    sublabel: "We have your order and will start baking soon",
    color: "#C9A24B",
  },
  CONFIRMED: {
    hour: 1, // 7am
    label: "Order confirmed",
    sublabel: "Your order is confirmed and scheduled",
    color: "#D4A843",
  },
  BAKING: {
    hour: 4, // 10am
    label: "Baking fresh now",
    sublabel: "Everything is being made fresh in our kitchen",
    color: "#E85A24",
  },
  READY: {
    hour: 6, // 12pm
    label: "Ready for delivery",
    sublabel: "Your order is packed and waiting to go out",
    color: "#4E7A1F",
  },
  OUT_FOR_DELIVERY: {
    hour: 9, // 3pm
    label: "On the way to you",
    sublabel: "Our driver is heading to your address",
    color: "#1B4965",
  },
  DELIVERED: {
    hour: 0, // 6pm — wraps around, use special handling
    label: "Delivered",
    sublabel: "Enjoy your fresh bread and pastries!",
    color: "#8CC63F",
  },
  CANCELLED: {
    hour: 0,
    label: "Cancelled",
    sublabel: "This order was cancelled",
    color: "#C0392B",
  },
};

interface OrderClockProps {
  status: OrderStatus;
  orderNumber: string;
}

export default function OrderClock({ status, orderNumber }: OrderClockProps) {
  const config = STATUS_MAP[status];
  const isCancelled = status === "CANCELLED";

  // Compute latte position on the outer ring
  // 0 = 12 o'clock, moving clockwise
  const angle = (config.hour / 12) * 360;
  const radius = 130; // px from center
  const centerX = 200;
  const centerY = 200;

  const latteX = centerX + radius * Math.sin((angle * Math.PI) / 180);
  const latteY = centerY - radius * Math.cos((angle * Math.PI) / 180);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      {/* The clock */}
      <div
        style={{
          position: "relative",
          width: 400,
          height: 400,
          marginBottom: 32,
        }}
      >
        {/* Glow behind clock */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle, ${config.color}33 0%, transparent 60%)`,
            borderRadius: "50%",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Clock face — outer ring */}
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="rgba(42, 27, 45, 0.6)"
            stroke="rgba(184, 160, 179, 0.3)"
            strokeWidth="1"
          />

          {/* Inner circle */}
          <circle
            cx="200"
            cy="200"
            r="130"
            fill="none"
            stroke="rgba(184, 160, 179, 0.15)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const markerAngle = (i / 12) * 360;
            const x1 = 200 + 155 * Math.sin((markerAngle * Math.PI) / 180);
            const y1 = 200 - 155 * Math.cos((markerAngle * Math.PI) / 180);
            const x2 = 200 + 145 * Math.sin((markerAngle * Math.PI) / 180);
            const y2 = 200 - 145 * Math.cos((markerAngle * Math.PI) / 180);
            const isPast =
              i <= config.hour || (status === "DELIVERED" && i >= 0 && i <= 6);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isPast ? config.color : "rgba(184, 160, 179, 0.3)"}
                strokeWidth={isPast ? 3 : 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour labels (6am, 9am, 12pm, 3pm, 6pm, 9pm) */}
          {[
            { label: "6am", hour: 0 },
            { label: "9am", hour: 3 },
            { label: "12pm", hour: 6 },
            { label: "3pm", hour: 9 },
            { label: "6pm", hour: 0, isWrap: true },
          ].map((marker, i) => {
            const markerAngle = (marker.hour / 12) * 360;
            const labelX = 200 + 180 * Math.sin((markerAngle * Math.PI) / 180);
            const labelY = 200 - 180 * Math.cos((markerAngle * Math.PI) / 180);
            // For 6pm (bottom), push label down
            const finalY = marker.isWrap ? 200 + 185 : labelY;
            const finalX = marker.isWrap ? 200 : labelX;

            const isPast = marker.hour <= config.hour;

            return (
              <text
                key={i}
                x={finalX}
                y={finalY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="800"
                fill={isPast ? config.color : "rgba(184, 160, 179, 0.5)"}
                style={{ letterSpacing: 1 }}
              >
                {marker.label}
              </text>
            );
          })}

          {/* Progress arc — from 12 o'clock to current hour */}
          <motion.path
            d={describeArc(200, 200, 155, 0, config.hour * 30)}
            stroke={config.color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Center text */}
          <text
            x="200"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="rgba(184, 160, 179, 0.6)"
            letterSpacing="3"
          >
            ORDER
          </text>
          <text
            x="200"
            y="215"
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill="#F5F0EB"
            letterSpacing="0.5"
          >
            #{orderNumber}
          </text>

          {/* Latte glass — animates to the current hour position */}
          <motion.g
            initial={false}
            animate={{
              x: latteX - 200,
              y: latteY - 200,
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Latte glass */}
            <g transform="translate(200, 200)">
              <motion.g
                animate={{ rotate: angle }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Glass body */}
                <path
                  d="M -10 -12 L 10 -12 L 8 14 Q 7 18 0 18 Q -7 18 -8 14 Z"
                  fill="#F5F0EB"
                  stroke={config.color}
                  strokeWidth="2"
                />
                {/* Coffee inside */}
                <path
                  d="M -9 -6 L 9 -6 L 7 12 Q 6 15 0 15 Q -6 15 -7 12 Z"
                  fill="#8B5A2B"
                />
                {/* Milk swirl */}
                <path
                  d="M -6 -3 Q 0 -5 6 -3"
                  stroke="#F5F0EB"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Straw */}
                <line
                  x1="3"
                  y1="-12"
                  x2="6"
                  y2="-20"
                  stroke={config.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>
          </motion.g>

          {/* Pulse ring around latte */}
          <motion.circle
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            cx={latteX}
            cy={latteY}
            r={20}
            fill="none"
            stroke={config.color}
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Status label */}
      <motion.div
        key={config.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        <div
          style={{
            fontSize: 11,
            color: config.color,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          {isCancelled ? "Order Status" : "Current Status"}
        </div>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          {config.label}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          {config.sublabel}
        </p>
      </motion.div>
    </div>
  );
}

// Utility: describe an SVG arc path for the progress ring
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  if (endAngle === 0 || endAngle >= 360) {
    return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${
      cx - 0.01
    } ${cy - radius}`;
  }

  const startX = cx + radius * Math.sin((startAngle * Math.PI) / 180);
  const startY = cy - radius * Math.cos((startAngle * Math.PI) / 180);
  const endX = cx + radius * Math.sin((endAngle * Math.PI) / 180);
  const endY = cy - radius * Math.cos((endAngle * Math.PI) / 180);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
}
