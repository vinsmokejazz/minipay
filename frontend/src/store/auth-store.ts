"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";
import type { UserProfile } from "@/types/api";
import { clearAccessToken } from "@/lib/auth";

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      fetchProfile: async () => {
        try {
          set({ isLoading: true });
          const data = await apiFetch<UserProfile>("/user/me");
          set({ user: data });
        } catch (error) {
          console.error("Profile fetch failed", error);
          set({ user: null });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        try {
          await apiFetch("/auth/logout", { method: "POST" });
        } catch (error) {
          // ignore
          console.warn("Logout request failed", error);
        } finally {
          clearAccessToken();
          set({ user: null });
        }
      },
    }),
    {
      name: "minipay-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
