"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getAccessToken } from "@/lib/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (getAccessToken() && !user) {
      void fetchProfile();
    }
  }, [fetchProfile, user]);

  return <>{children}</>;
}
