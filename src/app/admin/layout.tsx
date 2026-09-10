import { SiteHeader } from "@/components/landing/site-header";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { AdminMobileBar } from "@/features/admin/components/admin-mobile-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader variant="admin" showSearch={false} />
      <div className="flex w-full flex-1">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <AdminMobileBar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
