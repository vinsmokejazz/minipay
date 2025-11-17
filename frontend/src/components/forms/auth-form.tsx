"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetch } from "@/lib/api";
import type { AuthResponse, SignUpPayload, AuthCredentials } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAccessToken } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const baseSchema = z.object({
  username: z.string().min(3, { message: "Min 3 characters" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

const signUpSchema = baseSchema.extend({
  firstName: z.string().min(2, { message: "First name required" }),
  lastName: z.string().min(2, { message: "Last name required" }),
});

type SignInValues = z.infer<typeof baseSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;
type FormValues = SignInValues | SignUpValues;

type FormFieldErrors = Partial<
  Record<keyof SignUpValues, { message?: string }>
>;

type AuthMode = "signin" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(mode === "signup" ? signUpSchema : baseSchema),
    defaultValues:
      mode === "signup"
        ? { username: "", password: "", firstName: "", lastName: "" }
        : { username: "", password: "" },
  });

  async function onSubmit(values: SignInValues | SignUpValues) {
    setSubmitting(true);
    try {
      const endpoint = mode === "signup" ? "/signup" : "/signin";
      const payload = values as SignUpPayload | AuthCredentials;
      const data = await apiFetch<AuthResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success(
        mode === "signup" ? "Account created successfully" : "Welcome back"
      );
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Request failed";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const isSignUp = mode === "signup";
  const errors = form.formState.errors as FormFieldErrors;

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          {isSignUp ? "Create account" : "Welcome back"}
        </p>
        <h1 className="text-3xl font-semibold">
          {isSignUp ? "Join MiniPay" : "Sign in to MiniPay"}
        </h1>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="username">
            Username
          </label>
          <Input id="username" autoComplete="username" {...form.register("username")} />
          {errors.username && (
            <p className="text-sm text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>

        {isSignUp && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="firstName">
                First name
              </label>
              <Input id="firstName" {...form.register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="lastName">
                Last name
              </label>
              <Input id="lastName" {...form.register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            {...form.register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : isSignUp ? "Create account" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-white/60">
        {isSignUp ? "Already have an account?" : "Need an account?"} {" "}
        <Link className="text-white" href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
}
