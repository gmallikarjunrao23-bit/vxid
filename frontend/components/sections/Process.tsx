"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dissect your vision until we understand it better than you do.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Every pixel earns its place. Every line of code has purpose.",
  },
  {
    number: "03",
    title: "Build",
    description: "Senior engineers. No juniors. No shortcuts.",
  },
  {
    number: "04",
    title: "Launch",
    description: "We ship. Then we obsess over metrics.",
  },
];

export default function Process() {
  return (
    <section className="bg-void px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">HOW WE WORK</p>
          <h2 className="display max-w-3xl text-4xl md:text-5xl lg:text-6xl">
            From brief to launch.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col bg-card p-8"
            >
              <div className="display mb-6 text-5xl font-bold text-gold/30 transition-colors duration-300 group-hover:text-gold">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
