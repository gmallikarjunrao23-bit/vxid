"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shell: renders the site navbar + footer for public routes,
 * and a bare layout for /admin routes (no marketing nav overlap).
 */
export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
