"use client";

import { ReactNode, type RefObject } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outlined-gold" | "outlined-white" | "dark";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** When provided, renders as an anchor instead of a button. */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  filled:
    "bg-gold text-void font-semibold hover:bg-white transition-colors duration-300",
  "outlined-gold":
    "border border-gold text-gold hover:bg-gold hover:text-void transition-colors duration-300",
  "outlined-white":
    "border border-white/30 text-white hover:border-white hover:bg-white/5 transition-colors duration-300",
  dark: "bg-void text-white border border-border hover:border-gold transition-colors duration-300",
};

/**
 * Magnetic button/link. Follows the cursor within 60px, springs back on leave.
 * Renders as <a> when `href` is set, otherwise as <button>.
 * Touch devices render without the magnetic effect (the hook self-disables).
 */
export default function MagneticButton({
  children,
  variant = "outlined-gold",
  href,
  onClick,
  disabled,
  type,
  className,
}: MagneticButtonProps) {
  // The magnetic effect works on any HTMLElement; cast the ref to match
  // the concrete element type at each attach point.
  const ref = useMagnetic<HTMLElement>();

  const baseClasses = cn(
    "magnetic relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm tracking-wide",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        ref={ref as RefObject<HTMLAnchorElement>}
        onClick={onClick}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
