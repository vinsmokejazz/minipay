"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="mx-auto mt-20 w-full max-w-5xl px-6 text-center md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-[2.5rem] px-8 py-12"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Ready?</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Open your multi-currency account in minutes
        </h2>
        <p className="mt-3 text-white/70">
          Start with the Standard plan, upgrade anytime, and manage every balance from a single, delightful workspace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg">Create account</Button>
          <Button variant="ghost" size="lg">
            Talk to sales
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
