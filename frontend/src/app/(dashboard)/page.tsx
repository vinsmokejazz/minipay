import { BalanceCard } from "@/components/dashboard/balance-card";

const highlights = [
  {
    title: "Instant payouts",
    detail: "Send to any MiniPay account globally in < 3 seconds.",
  },
  {
    title: "Treasury yields",
    detail: "Earn 3.1% APY on idle balances with no lockups.",
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <BalanceCard />
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="glass-panel rounded-4xl border border-white/10 p-6 text-white"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              {highlight.title}
            </p>
            <p className="mt-3 text-white/70">{highlight.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
