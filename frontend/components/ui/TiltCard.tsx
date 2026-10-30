"use client";

import { ComponentPropsWithoutRef, ReactNode, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { clamp } from "@/lib/utils";

interface TiltCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
  /** Perspective in px. */
  perspective?: number;
}

/**
 * Subtle 3D tilt card. Follows the cursor with a max tilt,
 * springs back on leave. Includes a gold radial shine that tracks the pointer.
 */
export default function TiltCard({
  children,
  maxTilt = 8,
  perspective = 1000,
  className,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, rxPct: 50, ryPct: 50 });
  const raf = useRef<number>(0);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    const ry = (x - 0.5) * 2 * maxTilt;
    const rx = -(y - 0.5) * 2 * maxTilt;

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setTilt({ rx, ry, rxPct: x * 100, ryPct: y * 100 });
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(raf.current);
    setTilt({ rx: 0, ry: 0, rxPct: 50, ryPct: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        perspective: `${perspective}px`,
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
      }}
      className={className}
      {...props}
    >
      {children}
      <div
        className="tilt-shine"
        style={{ ["--rx" as string]: `${tilt.rxPct}%`, ["--ry" as string]: `${tilt.ryPct}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
