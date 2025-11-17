"use client";

import { TransferForm } from "@/components/dashboard/transfer-form";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { useSWRConfig } from "swr";

export default function TransferPage() {
  const { mutate } = useSWRConfig();

  return (
    <div className="space-y-6">
      <BalanceCard />
      <div className="glass-panel rounded-4xl border border-white/10 p-6 text-white">
        <h1 className="text-2xl font-semibold">Send a transfer</h1>
        <p className="mt-2 text-white/70">
          Funds arrive instantly when the recipient already uses MiniPay.
        </p>
        <div className="mt-6">
          <TransferForm
            onSuccess={() => {
              void mutate("balance");
            }}
          />
        </div>
      </div>
    </div>
  );
}
