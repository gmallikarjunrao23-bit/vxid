"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Full-screen black overlay that slides in/out for route transitions.
 * Used as a page-level wrapper; the overlay is controlled by parent
 * AnimatePresence via the `phase` prop.
 */
export function PageTransition({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}

/** The sliding overlay itself, intended to be mounted inside an AnimatePresence. */
export function PageOverlay({
  overlayKey,
  direction = "enter",
}: {
  overlayKey: string;
  direction?: "enter" | "exit";
}) {
  const isEnter = direction === "enter";
  return (
    <motion.div
      key={overlayKey}
      initial={{ y: isEnter ? "-100%" : 0 }}
      animate={{ y: isEnter ? 0 : "100%" }}
      exit={{ y: isEnter ? "100%" : 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[99990] bg-void pointer-events-none"
      style={{ pointerEvents: isEnter ? "auto" : "none" }}
    />
  );
}
