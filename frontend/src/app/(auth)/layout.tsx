import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniPay | Secure Access",
  description: "Sign in to manage your MiniPay accounts.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
