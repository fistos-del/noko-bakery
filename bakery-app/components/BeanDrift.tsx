"use client";

import { useEffect, useRef } from "react";

interface Bean {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  depth: number;
}

export default function BeanDrift() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beansRef = useRef<Bean[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth * window.devicePixelRatio;
      canvas.height = parent.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const beanCount = 30;
    const beans: Bean[] = [];
    for (let i = 0; i < beanCount; i++) {
      const parent = canvas.parentElement;
      if (!parent) continue;
      beans.push({
        x: Math.random() * parent.offsetWidth,
        y: Math.random() * parent.offsetHeight,
        size: 8 + Math.random() * 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        depth: 0.3 + Math.random() * 0.7,
      });
    }
    beansRef.current = beans;

    let animationFrame: number;
    const animate = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      beansRef.current.forEach((bean) => {
        bean.x += bean.vx * bean.depth;
        bean.y += bean.vy * bean.depth;
        bean.rotation += bean.rotationSpeed;

        // Wrap around
        if (bean.x < -20) bean.x = w + 20;
        if (bean.x > w + 20) bean.x = -20;
        if (bean.y < -20) bean.y = h + 20;
        if (bean.y > h + 20) bean.y = -20;

        ctx.save();
        ctx.translate(bean.x, bean.y);
        ctx.rotate(bean.rotation);
        ctx.globalAlpha = 0.15 + bean.depth * 0.3;

        // Draw bean shape
        const s = bean.size;
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#8B5A2B";
        ctx.fill();

        // Bean seam
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.quadraticCurveTo(0, -s * 0.3, s * 0.8, 0);
        ctx.strokeStyle = "#2A1B2D";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
