"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import type { BalanceResponse } from "@/types/api";
import { motion } from "framer-motion";

async function fetchBalance() {
  return apiFetch<BalanceResponse>("/account/balance");
}

export function BalanceCard() {
  const { data, isLoading, mutate } = useSWR("balance", fetchBalance, {
    refreshInterval: 1000 * 30,
  });

  const balance = data?.balance ?? 0;

  return (
    <motion.div
      className="glass-panel rounded-4xl p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Current balance
          </p>
          <p className="mt-4 text-4xl font-semibold">
            {isLoading ? "--" : balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>
        </div>
        <button
          type="button"
          className="text-sm text-white/70 underline-offset-4 hover:underline"
          onClick={() => mutate()}
        >
          Refresh
        </button>
      </div>
    </motion.div>
  );
}
