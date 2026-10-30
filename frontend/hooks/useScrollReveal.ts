"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

interface ScrollRevealResult {
  ref: RefObject<HTMLDivElement>;
  isVisible: boolean;
}

/**
 * Reveal an element when it intersects the viewport.
 * Defaults: threshold 0.15, once true.
 */
export function useScrollReveal({
  threshold = 0.15,
  once = true,
  rootMargin = "0px 0px -10% 0px",
}: ScrollRevealOptions = {}): ScrollRevealResult {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isVisible };
}
