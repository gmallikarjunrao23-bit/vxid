"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { clamp } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 8, suffix: "", label: "Years of Experience" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Satisfaction Rate" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-surface px-6 py-20 lg:px-10">
      <div className="mx-auto grid max-w-8xl grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="display text-5xl font-bold text-gold md:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-sm uppercase tracking-wider text-white/70">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
