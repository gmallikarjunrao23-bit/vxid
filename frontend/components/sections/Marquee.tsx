"use client";

const items = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "POSTGRESQL",
  "PRISMA",
  "FRAMER MOTION",
  "GSAP",
  "FIGMA",
  "TAILWIND",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-border bg-gold/10 py-6">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-gold">
                {item}
              </span>
              <span className="text-gold/60">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
