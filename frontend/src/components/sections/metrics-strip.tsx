"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Avg. transfer time", value: "2.3s" },
  { label: "Fraud prevented", value: "$3.2B" },
  { label: "Countries supported", value: "140" },
  { label: "Customer NPS", value: "+76" },
];

export function MetricsStrip() {
  return (
    <div className="mt-12 border-y border-white/5 bg-white/5">
      <motion.div
        className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-6 px-6 py-6 text-white/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              {stat.label}
            </span>
            <span className="text-2xl font-semibold text-white">{stat.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
