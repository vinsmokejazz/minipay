import { CTASection } from "@/components/sections/cta";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { MetricsStrip } from "@/components/sections/metrics-strip";
import { PricingSection } from "@/components/sections/pricing";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="pb-24">
      <SiteHeader />
      <HeroSection />
      <MetricsStrip />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
