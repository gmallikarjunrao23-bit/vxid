"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/40 bg-void">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-10">
        {/* Top: logo + nav */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <Link href="/" className="display text-3xl font-bold">
            <span className="text-gold">VXID</span>
          </Link>

          <ul className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: tagline */}
        <div className="my-12 border-y border-border py-8">
          <p className="italic text-lg text-muted">
            Built with obsession. Deployed with precision.
          </p>
        </div>

        {/* Bottom: copyright + socials */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} VXID. All rights reserved.
          </p>

          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-gold"
                >
                  <s.icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
