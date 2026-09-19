"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  delay = 0,
  prefix = "",
  suffix = "",
  style,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let startTime: number | null = null;
    let frameId: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        setDisplay(Math.floor(value * eased));

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplay(value);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, duration, delay]);

  return (
    <span style={style}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}