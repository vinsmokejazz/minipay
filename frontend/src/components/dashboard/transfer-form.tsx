"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import type { TransferPayload, TransferResponse } from "@/types/api";
import { toast } from "sonner";

const transferSchema = z.object({
  to: z.string().min(1, { message: "Recipient ID required" }),
  amount: z.number().positive({ message: "Amount must be positive" }),
});

type TransferValues = z.infer<typeof transferSchema>;

interface TransferFormProps {
  onSuccess?: (data: TransferResponse) => void;
}

export function TransferForm({ onSuccess }: TransferFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { to: "", amount: 0 },
  });

  async function onSubmit(values: TransferValues) {
    try {
      const payload: TransferPayload = {
        to: values.to,
        amount: values.amount,
      };
      const response = await apiFetch<TransferResponse>("/account/transfer", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success(response.message ?? "Transfer successful");
      reset();
      onSuccess?.(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transfer failed";
      toast.error(message);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm text-white/70" htmlFor="to">
          Recipient user ID
        </label>
        <Input id="to" {...register("to")} placeholder="64f7cb..." />
        {errors.to && <p className="text-sm text-red-400">{errors.to.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/70" htmlFor="amount">
          Amount (USD)
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-sm text-red-400">{errors.amount.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Send funds
      </Button>
    </form>
  );
}
