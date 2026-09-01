// import { SiteHeader } from "@/components/landing/site-header";
// import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen flex-col bg-stone-50">
//       <SiteHeader />
//       <div className="flex flex-1 flex-col md:flex-row">
//         <AdminSidebar />
//         <main className="flex-1">{children}</main>
//       </div>
//     </div>
//   );
// }
import { SiteHeader } from "@/components/landing/site-header";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { AdminMobileBar } from "@/features/admin/components/admin-mobile-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <SiteHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <AdminMobileBar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
