"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const headlineLines = ["We Build", "Digital", "Empires."];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordVariant = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-void" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.12), transparent 40%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.08), transparent 45%), radial-gradient(circle at 50% 90%, rgba(201,168,76,0.10), transparent 50%)",
          }}
        />
        {/* Floating gold orbs */}
        <motion.div
          className="absolute left-[15%] top-[25%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)" }}
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.10), transparent 70%)" }}
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl text-center">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="display text-hero text-white sm:text-7xl md:text-8xl lg:text-[6rem]"
        >
          {headlineLines.map((line, lineIndex) => (
            <span key={line} className="block">
              {line.split(" ").map((word, wordIndex) => (
                <span key={`${lineIndex}-${wordIndex}`} className="overflow-hidden inline-block">
                  <motion.span variants={wordVariant} className="inline-block">
                    {word}
                    {wordIndex < line.split(" ").length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-balance text-lg text-muted md:text-xl"
        >
          Premium websites, products, and experiences for brands that refuse to be
          ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="/work" variant="filled">
            See Our Work
          </MagneticButton>
          <MagneticButton href="/contact" variant="outlined-white">
            Get In Touch
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
        <div className="h-10 w-px bg-gold/30">
          <motion.div
            className="h-1/2 w-full bg-gold"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
