"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContact, type ContactPayload } from "@/lib/api";

const budgets = ["<$5k", "$5k-$15k", "$15k-$50k", "$50k+"];
const projectTypes = ["Website", "Mobile App", "Branding", "Other"];

interface FormState {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  budget: budgets[0],
  projectType: projectTypes[0],
  message: "",
};

const socials = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) next.message = "Please tell us about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const payload: ContactPayload = {
        name: form.name,
        email: form.email,
        budget: form.budget,
        projectType: form.projectType,
        message: form.message,
      };
      const res = await submitContact(payload);
      if (res.success) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-void">
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left half — sticky */}
        <div className="flex flex-col justify-center px-6 py-32 lg:sticky lg:top-0 lg:h-screen lg:justify-center lg:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="display text-5xl font-bold text-gold md:text-6xl lg:text-7xl"
          >
            Let&apos;s build something.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            Tell us about your project and we&apos;ll be in touch within 24
            hours.
          </motion.p>

          <motion.a
            href="mailto:hello@vxid.studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 inline-flex w-fit items-center gap-2 text-xl text-white underline-offset-4 hover:text-gold hover:underline"
          >
            hello@vxid.studio
          </motion.a>

          <div className="mt-10 flex gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-gold"
              >
                <s.icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* Right half — form */}
        <div className="px-6 py-32 lg:px-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[60vh] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold text-gold"
                >
                  <Check size={40} />
                </motion.div>
                <h2 className="display mt-8 text-4xl">Message sent.</h2>
                <p className="mt-4 text-lg text-muted">
                  We&apos;ll be in touch within 24 hours.
                </p>
                <MagneticButton
                  href="/"
                  variant="outlined-gold"
                  className="mt-10"
                >
                  Back to Home
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="vxid-input"
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="vxid-input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Budget Range">
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="vxid-input"
                    >
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Project Type">
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="vxid-input"
                    >
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" error={errors.message}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    className="vxid-input resize-none"
                  />
                </Field>

                <MagneticButton
                  type="submit"
                  variant="filled"
                  disabled={status === "submitting"}
                  className="w-full"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    <>Send Message →</>
                  )}
                </MagneticButton>

                {status === "error" && (
                  <p className="text-center text-sm text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-white/70">{label}</label>
      {children}
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
