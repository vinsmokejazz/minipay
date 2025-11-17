"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { clearAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function DashboardTopBar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  function handleLogout() {
    logout();
    clearAccessToken();
    router.push("/sign-in");
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
      <div>
        <p className="text-sm text-white/60">Logged in as</p>
        <p className="text-xl font-semibold text-white">
          {user ? `${user.firstName} ${user.lastName}` : "MiniPay member"}
        </p>
      </div>
      <Button variant="ghost" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
