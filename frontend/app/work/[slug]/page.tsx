"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, getNextProject } from "@/data/projects";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const project = getProject(params.slug);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-void px-6 text-center">
        <h1 className="display text-4xl">Project not found.</h1>
        <Link
          href="/work"
          className="text-gold underline underline-offset-4"
        >
          Back to all work
        </Link>
      </div>
    );
  }

  const nextProject = getNextProject(project.slug);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
    { label: "Tech Stack", value: project.techStack.join(", ") },
  ];

  const sections = [
    { label: "Problem", text: project.problem },
    { label: "Solution", text: project.solution },
    { label: "Outcome", text: project.outcome },
  ];

  return (
    <div className="bg-void">
      {/* Back button */}
      <button
        onClick={() => router.push("/work")}
        className="absolute left-6 top-24 z-20 flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold lg:left-10"
      >
        <ArrowLeft size={16} /> Back to Work
      </button>

      {/* Full-bleed hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0 bg-void/40" />
        <div className="absolute bottom-10 left-6 right-6 lg:left-10">
          <span className="rounded-full border border-gold/30 bg-void/60 px-3 py-1 font-mono text-xs text-gold backdrop-blur">
            {project.category}
          </span>
          <h1 className="display mt-4 text-5xl font-bold text-white md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Meta */}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-8xl grid-cols-2 gap-8 border-b border-border pb-12 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <div className="eyebrow mb-2">{m.label}</div>
              <div className="text-sm text-white/80">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-light leading-relaxed text-white/90 md:text-3xl"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Problem / Solution / Outcome */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {sections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-8"
              >
                <div className="eyebrow mb-4">{section.label}</div>
                <p className="text-sm leading-relaxed text-muted">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {project.gallery.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-video overflow-hidden rounded-xl"
              >
                <div
                  className="h-full w-full transition-transform duration-700 hover:scale-105"
                  style={{ background: g.gradient }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="px-6 pb-24 lg:px-10">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-gold/60 md:p-12"
          >
            <div>
              <p className="eyebrow mb-2">Next Project</p>
              <h2 className="display text-3xl font-bold text-white md:text-4xl">
                {nextProject.name}
              </h2>
            </div>
            <span className="flex items-center gap-2 text-gold">
              View <ArrowUpRight size={28} />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
