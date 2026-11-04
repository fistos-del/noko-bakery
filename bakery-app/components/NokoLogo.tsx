"use client";

interface NokoLogoProps {
  size?: number;
  color?: string;
}

export default function NokoLogo({
  size = 48,
  color = "currentColor",
}: NokoLogoProps) {
  return (
    <svg
      width={size}
      height={size * 0.45}
      viewBox="0 0 160 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* 
        1. The Left Loop (The folded dough)
        Starts left, sweeps up, loops back down, crosses over itself.
      */}
      <path
        d="M 10 45 
           C 8 35, 15 20, 30 15 
           C 45 10, 55 20, 60 30 
           C 65 40, 50 45, 45 35
           C 40 25, 30 25, 25 30
           C 20 35, 15 40, 10 45 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 
        2. The Right Loop (The long tail)
        Connects from the center overlap, sweeps far right, rounds the end, and returns.
      */}
      <path
        d="M 55 32 
           C 65 15, 80 15, 100 18
           C 120 20, 145 25, 140 40
           C 135 55, 115 52, 90 48
           C 75 45, 65 42, 55 38"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 
        3. The Bottom Base Line
        Sweeps underneath both loops to close the baguette shape.
      */}
      <path
        d="M 12 47 
           C 30 52, 70 52, 110 50
           C 125 49, 135 45, 138 42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 
        4. Inner Detail (Left Score)
      */}
      <path
        d="M 25 35 
           C 25 28, 40 25, 48 32
           C 50 35, 40 38, 30 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 
        5. Inner Detail (Right Score)
      */}
      <path
        d="M 75 32 
           C 85 28, 100 28, 110 32
           C 115 35, 100 38, 85 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
