"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  PenTool,
  Palette,
  Server,
  TrendingUp,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Production-grade websites that perform.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native iOS & Android. Cross-platform perfection.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Interfaces that make users feel something.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Visual systems that command rooms.",
  },
  {
    icon: Server,
    title: "API & Backend",
    description: "Robust, scalable, bulletproof infrastructure.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance",
    description: "Top of search. Top of mind.",
  },
];

export default function Services() {
  return (
    <section className="relative bg-void px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-8xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">WHAT WE DO</p>
          <h2 className="display max-w-3xl text-4xl md:text-5xl lg:text-6xl">
            Capabilities built for scale.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard
                className="group relative flex h-full flex-col bg-card p-8 transition-colors duration-300 hover:bg-surface"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/5">
                    <service.icon className="text-gold" size={22} />
                  </div>
                  <span className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                {/* Gold border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-lg border border-transparent transition-colors duration-300 group-hover:border-gold/50" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
