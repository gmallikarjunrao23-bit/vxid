"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "@/lib/utils";

interface UseMagneticOptions {
  /** Radius within which the button follows the cursor. */
  radius?: number;
  /** Strength of the magnetic pull (0–1). */
  strength?: number;
}

/**
 * Magnetic effect: the element is pulled toward the cursor when within
 * `radius` px, and springs back on leave.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>({
  radius = 60,
  strength = 0.35,
}: UseMagneticOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        targetX = distX * strength;
        targetY = distY * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.18);
      currentY = lerp(currentY, targetY, 0.18);
      node.style.transform = `translate(${clamp(currentX, -radius, radius)}px, ${clamp(currentY, -radius, radius)}px)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    node.addEventListener("mouseleave", handleLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, [radius, strength]);

  return ref;
}
