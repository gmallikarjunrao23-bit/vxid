"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { login, storeToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await login({ email, password });
      storeToken(res.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="display mb-8 block text-center text-3xl font-bold">
          <span className="text-gold">VXID</span>
          <span className="text-muted text-lg font-normal"> / Admin</span>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vxid.studio"
              className="vxid-input"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="vxid-input"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 font-semibold text-void transition-colors hover:bg-white disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Demo seed: admin@vxid.studio / (set in backend .env ADMIN seed)
        </p>
      </motion.div>
    </div>
  );
}
