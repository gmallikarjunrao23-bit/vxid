"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-void/80 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-5 lg:px-10">
          {/* Logo */}
          <Link href="/" className="display text-2xl font-bold tracking-tight">
            <span className="text-gold">VXID</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors duration-300 hover:text-gold",
                    isActive(link.href) ? "text-gold" : "text-white/80"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="/contact" variant="outlined-gold">
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="text-white" size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" className="display text-2xl font-bold" onClick={() => setMenuOpen(false)}>
                <span className="text-gold">VXID</span>
              </Link>
              <button
                className="flex h-10 w-10 items-center justify-center"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {[
                { label: "Home", href: "/" },
                ...navLinks,
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "display block border-b border-border py-4 text-5xl",
                      isActive(link.href) ? "text-gold" : "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.08 + 0.1, duration: 0.4 }}
                className="mt-10"
              >
                <MagneticButton
                  href="/contact"
                  variant="filled"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </MagneticButton>
              </motion.div>
            </div>

            <div className="px-6 py-8 text-sm text-muted">
              Let&apos;s build something legendary.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
