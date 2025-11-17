"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Zap, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bank-grade security",
    description: "Multi-factor auth, device risk scoring, and end-to-end encryption guard every action.",
  },
  {
    icon: Globe,
    title: "200+ currencies",
    description: "Open local accounts in seconds and convert FX with real-time interbank rates.",
  },
  {
    icon: Zap,
    title: "Instant transfers",
    description: "Send treasury payouts or reimbursements immediately with automated compliance checks.",
  },
  {
    icon: Sparkles,
    title: "Perks & rewards",
    description: "Unlock travel upgrades, lounge access, and premium partner offers from day one.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto mt-16 w-full max-w-6xl px-6 md:px-8">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Why MiniPay</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          Reimagine global money movement
        </h2>
        <p className="text-lg text-white/70 md:max-w-3xl md:self-center">
          Manage everything from payroll to premium travel cards with unified controls, automated compliance, and delightful customer perks.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-panel flex flex-col gap-4 rounded-3xl p-6 text-left"
          >
            <feature.icon className="h-10 w-10 text-white" />
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
