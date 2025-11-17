import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopBar } from "@/components/dashboard/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
      <DashboardSidebar />
      <div className="flex-1 space-y-6">
        <DashboardTopBar />
        {children}
      </div>
    </div>
  );
}
