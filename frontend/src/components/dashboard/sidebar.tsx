"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/transfer", label: "Transfer" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:w-64">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Spaces</p>
      </div>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition hover:text-white",
              pathname === link.href &&
                "bg-white/10 text-white shadow-[0_15px_35px_rgba(255,255,255,0.05)]"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
