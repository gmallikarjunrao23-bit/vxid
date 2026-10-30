"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "VXID transformed our entire digital presence. Revenue up 340% in 6 months.",
    name: "Sarah K.",
    title: "CEO, Aurum Finance",
  },
  {
    quote:
      "The only agency that actually delivered what they promised. On time. On budget.",
    name: "Marcus L.",
    title: "Founder, Vela",
  },
  {
    quote:
      "Working with VXID felt like having a co-founder who only does perfect work.",
    name: "Priya M.",
    title: "CTO, Nexus",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-surface px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="eyebrow mb-4">WHAT CLIENTS SAY</p>
        </motion.div>

        <div className="relative mt-16 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative flex flex-col items-center"
            >
              <div className="display mb-6 text-7xl leading-none text-gold">
                &ldquo;
              </div>
              <blockquote className="max-w-3xl text-center text-balance text-2xl font-light text-white md:text-3xl">
                {testimonials[index].quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 font-display text-lg font-bold text-gold">
                  {testimonials[index].name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    {testimonials[index].name}
                  </div>
                  <div className="text-sm text-muted">
                    {testimonials[index].title}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-gold"
                  : "w-2 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
