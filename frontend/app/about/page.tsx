"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

const values = [
  {
    title: "Precision",
    description: "Every detail accounted for. Every measurement exact.",
  },
  {
    title: "Speed",
    description: "Velocity without sacrificing the craft. Ship fast, ship right.",
  },
  {
    title: "Craft",
    description: "We sweat the details others ignore. It&apos;s the difference.",
  },
  {
    title: "Obsession",
    description: "Good isn&apos;t a word in our vocabulary. Only exceptional.",
  },
];

const team = [
  {
    name: "Adrian Vex",
    role: "Founder & Creative Director",
    bio: "Twelve years turning ambitious ideas into digital realities. Built for speed, obsessed with craft.",
    socials: [Twitter, Github, Linkedin],
  },
  {
    name: "Lena Marsh",
    role: "Head of Engineering",
    bio: "Full-stack architect who treats every line of code like it matters. Ex-Stripe.",
    socials: [Github, Linkedin],
  },
  {
    name: "Dev Okonkwo",
    role: "Design Lead",
    bio: "Interface designer with an eye for restraint and a love for whitespace.",
    socials: [Twitter, Linkedin],
  },
];

const milestones = [
  { year: "2016", label: "Founded" },
  { year: "2018", label: "First 7-figure project" },
  { year: "2020", label: "Went fully remote" },
  { year: "2022", label: "Expanded to mobile" },
  { year: "2024", label: "120+ projects shipped" },
];

export default function AboutPage() {
  return (
    <div className="bg-void">
      {/* Hero */}
      <section className="px-6 pt-40 pb-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-8xl"
        >
          <p className="eyebrow mb-4">WHO WE ARE</p>
          <h1 className="display text-6xl md:text-7xl lg:text-8xl">
            We are <span className="text-gold">VXID.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            We are a senior team of designers and engineers who build digital
            empires for brands that refuse to be ordinary. No juniors, no
            shortcuts, no compromise — just relentless craft delivered at the
            speed of a startup.
          </p>
        </motion.div>
      </section>

      {/* Philosophy split */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-8xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">OUR PHILOSOPHY</p>
            <h2 className="display mb-6 text-4xl md:text-5xl">
              Silence over noise. Space over clutter.
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              <p>
                We believe the most luxurious experience is the one that feels
                effortless. That&apos;s the result of obsessive refinement —
                removing until only the essential remains.
              </p>
              <p>
                Every decision we make is guided by restraint. We use gold
                where power is needed, whitespace where focus belongs, and motion
                only where it means something. The result is work that feels
                inevitable.
              </p>
            </div>
          </motion.div>

          {/* Abstract gold geometric SVG animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-md justify-self-center"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B6914" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.polygon
                points="200,40 360,200 200,360 40,200"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
              <motion.polygon
                points="200,80 320,200 200,320 80,200"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
              <motion.circle
                cx="200"
                cy="200"
                r="60"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
              <circle cx="200" cy="200" r="14" fill="#C9A84C" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">WHAT WE STAND FOR</p>
            <h2 className="display mb-16 text-4xl md:text-5xl">Our values.</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-8"
              >
                <div className="display mb-4 text-3xl font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-muted"
                  dangerouslySetInnerHTML={{ __html: value.description }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">THE TEAM</p>
            <h2 className="display mb-16 text-4xl md:text-5xl">Senior only.</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-gold/60"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 display text-2xl font-bold text-gold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gold">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
                <div className="mt-6 flex gap-4">
                  {member.socials.map((Icon, j) => (
                    <a
                      key={j}
                      href="#"
                      aria-label={member.name}
                      className="text-muted transition-colors hover:text-gold"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-surface px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">THE JOURNEY</p>
            <h2 className="display mb-16 text-4xl md:text-5xl">Milestones.</h2>
          </motion.div>

          {/* Desktop horizontal scroll */}
          <div className="flex gap-12 overflow-x-auto pb-8 md:gap-20">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex w-40 shrink-0 flex-col"
              >
                <div className="display text-5xl font-bold text-gold">
                  {m.year}
                </div>
                <div className="mt-2 border-t border-border pt-3 text-sm text-muted">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
