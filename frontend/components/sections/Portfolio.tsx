"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { clamp, lerp } from "@/lib/utils";
import { projects } from "@/data/projects";

const homeProjects = projects.slice(0, 5);

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = 0;
    let current = 0;
    let rafId = 0;
    let isActive = false;

    const maxScroll = () =>
      Math.max(0, track.scrollWidth - section.clientWidth);

    const onWheel = (e: WheelEvent) => {
      const remaining = maxScroll();
      if (remaining <= 0) return;
      // Only capture when section is in view
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      e.preventDefault();
      target = clamp(target + e.deltaY * 1.4, 0, remaining);
      isActive = true;
    };

    const render = () => {
      current = lerp(current, target, 0.12);
      if (Math.abs(current - target) < 0.1) current = target;
      track.style.transform = `translateX(${-current}px)`;
      rafId = requestAnimationFrame(render);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    rafId = requestAnimationFrame(render);

    return () => {
      section.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative bg-void py-24 lg:py-32">
      {/* Header */}
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">OUR WORK</p>
          <h2 className="display max-w-3xl text-4xl md:text-5xl lg:text-6xl">
            Projects that move markets.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={sectionRef}
        className="relative mt-16 overflow-hidden"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-void to-transparent" />

        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-6 px-6"
          style={{ willChange: "transform" }}
        >
          {homeProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group relative block h-72 w-[80vw] overflow-hidden rounded-xl bg-card md:w-[420px] lg:w-[480px]"
              >
                {/* Parallax gradient "image" */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ background: project.gradient }}
                />
                <div className="absolute inset-0 bg-void/30" />

                {/* Category tag */}
                <span className="absolute right-4 top-4 rounded-full border border-gold/30 bg-void/60 px-3 py-1 font-mono text-xs text-gold backdrop-blur">
                  {project.category}
                </span>

                {/* Project name reveal from bottom */}
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="display text-3xl font-bold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gold">
                    {project.tagline} <ArrowUpRight size={14} />
                  </p>
                </div>

                {/* Gold hover border */}
                <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-gold/60" />
              </Link>
            </motion.div>
          ))}

          {/* Trailing CTA card */}
          <Link
            href="/work"
            className="flex h-72 w-[80vw] shrink-0 items-center justify-center rounded-xl border border-dashed border-border md:w-[420px] lg:w-[480px]"
          >
            <span className="text-center text-xl text-muted transition-colors hover:text-gold">
              View all projects →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
