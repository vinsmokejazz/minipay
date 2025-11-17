import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Personal", href: "#personal" },
  { label: "Business", href: "#business" },
  { label: "Company", href: "#company" },
  { label: "Blog", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-8">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#8a6bff] via-[#7047ff] to-[#4827d8] text-white shadow-[0_8px_30px_rgba(112,71,255,0.45)]">
          ƒ
        </span>
        <span className="hidden text-white/90 sm:inline-flex">MiniPay</span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="hidden text-white/80 sm:inline-flex">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </header>
  );
}
