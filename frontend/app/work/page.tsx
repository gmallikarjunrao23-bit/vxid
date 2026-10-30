"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | "Web" | "Mobile" | "Branding";

const filters: Filter[] = ["All", "Web", "Mobile", "Branding"];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative mb-6 inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-card"
    >
      <div className={cn("relative w-full overflow-hidden", project.height)}>
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0 bg-void/20" />

        {/* Category tag */}
        <span className="absolute right-4 top-4 rounded-full border border-gold/30 bg-void/60 px-3 py-1 font-mono text-xs text-gold backdrop-blur">
          {project.category}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-void via-void/60 to-transparent p-6 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <h3 className="display text-3xl font-bold text-white">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold">
            View project <ArrowUpRight size={14} />
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-gold/60" />
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="bg-void">
      {/* Hero */}
      <section className="px-6 pt-40 pb-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-8xl"
        >
          <p className="eyebrow mb-4">OUR WORK</p>
          <h1 className="display text-6xl md:text-7xl lg:text-8xl">Our Work.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            A selection of projects we&apos;ve crafted for brands that refused to
            settle.
          </p>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm transition-colors duration-300",
                  filter === f
                    ? "border-gold text-gold"
                    : "border-border text-muted hover:border-muted hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-8xl">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
