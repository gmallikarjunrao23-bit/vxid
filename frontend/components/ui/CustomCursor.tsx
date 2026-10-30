"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "@/lib/utils";

/**
 * VXID custom cursor.
 * - Gold orb, mix-blend-mode difference.
 * - Ring scales up over hoverable elements.
 * - Click triggers a scale-down burst.
 * Disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("vxid-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId = 0;
    let isHovering = false;

    const hoverableSelector =
      'a, button, [role="button"], input, textarea, select, .magnetic, [data-cursor="hover"]';

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = lerp(dotX, mouseX, 0.4);
      dotY = lerp(dotY, mouseY, 0.4);

      const target = e.target as Element | null;
      const hoverable =
        target?.closest && target.closest(hoverableSelector);

      if (hoverable) {
        ring.classList.add("is-hover");
        isHovering = true;
      } else {
        ring.classList.remove("is-hover");
        isHovering = false;
      }
    };

    const onMouseDown = () => {
      ring.classList.add("is-clicking");
    };
    const onMouseUp = () => {
      ring.classList.remove("is-clicking");
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const render = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      if (isHovering) {
        ring.style.opacity = "1";
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("vxid-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="vxid-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="vxid-cursor-ring" aria-hidden="true" />
    </>
  );
}
