"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Standard",
    price: "Free",
    description: "Zero monthly fee, perfect for getting started with MiniPay.",
    features: ["Instant balance sync", "3 virtual cards", "Community support"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$8.99",
    description: "Unlock travel upgrades, higher limits, and dedicated care.",
    features: [
      "Unlimited smart wallets",
      "Airport lounge network",
      "Priority FX desk",
      "Dedicated success manager",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$18.99",
    description: "Complete treasury toolkit for global-first companies.",
    features: [
      "Treasury automation",
      "On-demand compliance",
      "24/7 white-glove support",
      "Custom FX hedging",
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto mt-20 w-full max-w-6xl px-6 md:px-8">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Plans</p>
        <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Choose the plan that unlocks your next move
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.article
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`glass-panel flex flex-col rounded-3xl border border-white/10 p-6 text-left ${tier.highlighted ? "bg-white/10" : "bg-white/5"}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
              {tier.highlighted && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-white/60">{tier.description}</p>
            <p className="mt-6 text-4xl font-semibold text-white">{tier.price}</p>

            <ul className="mt-6 flex flex-1 flex-col gap-3 text-white/80">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 text-[#b18bff]">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={tier.highlighted ? "primary" : "ghost"}
              className="mt-8 w-full"
            >
              Get started
            </Button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
