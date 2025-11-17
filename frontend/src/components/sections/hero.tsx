"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Premium",
    price: "$8.99",
    subtitle: "Per month",
    gradient: "bg-linear-to-br from-[#6d4dff] to-[#241d5b]",
    delay: 0,
  },
  {
    title: "Standard",
    price: "$0",
    subtitle: "Always free",
    gradient: "bg-linear-to-br from-[#171a45] to-[#05040f]",
    delay: 0.15,
  },
  {
    title: "Elite",
    price: "$18.99",
    subtitle: "Full perks",
    gradient: "bg-linear-to-br from-[#37247b] via-[#282154] to-[#0e0828]",
    delay: 0.3,
  },
];

export function HeroSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-20 pt-10 md:flex-row md:items-center md:px-8 md:pt-16">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          New: Multi-currency cards
        </span>
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            One app, everything you need for money management
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Move money across borders in seconds, unlock travel perks, and
            manage your business stack from one secure dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="lg">Try now</Button>
          <Button variant="ghost" size="lg" className="backdrop-blur">
            Learn more
          </Button>
        </div>
        <dl className="grid grid-cols-3 gap-6 text-white/80">
          <div>
            <dt className="text-sm text-white/60">Personal users</dt>
            <dd className="text-2xl font-semibold">28M+</dd>
          </div>
          <div>
            <dt className="text-sm text-white/60">Businesses</dt>
            <dd className="text-2xl font-semibold">500k+</dd>
          </div>
          <div>
            <dt className="text-sm text-white/60">Currencies</dt>
            <dd className="text-2xl font-semibold">200+</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="relative h-[420px] w-[260px]">
          <div className="absolute -left-8 top-12 h-48 w-48 rounded-full bg-[#6d4dff]/40 blur-[120px]" />
          <div className="absolute -right-10 top-1/3 h-32 w-32 rounded-full bg-[#00d8ff]/40 blur-[100px]" />
          <div className="absolute inset-0 rotate-6 rounded-3xl border border-white/10" />
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, rotate: -8 + index * 3 }}
              animate={{ opacity: 1, y: 0, rotate: -4 + index * 4 }}
              transition={{ duration: 0.8, delay: card.delay, ease: "easeOut" }}
              className={cn(
                "glass-panel absolute inset-x-0 mx-auto flex w-[220px] flex-col rounded-3xl border border-white/15 px-6 py-8 text-center text-white shadow-[0_20px_50px_rgba(7,6,22,0.6)]",
                card.gradient
              )}
              style={{ top: `${index * 70}px`, transform: `translateY(${index * -8}px)` }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-white/60">
                Plan
              </span>
              <p className="mt-2 text-2xl font-semibold">{card.title}</p>
              <p className="text-sm text-white/60">{card.subtitle}</p>
              <p className="mt-6 text-3xl font-bold">{card.price}</p>
              <div className="mt-6 h-10 rounded-xl bg-linear-to-br from-white/20 to-white/5 text-xs uppercase tracking-widest text-white/70">
                <div className="flex h-full items-center justify-center">
                  Barcode
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
