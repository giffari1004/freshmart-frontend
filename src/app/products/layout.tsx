import { SiteHeader } from "@/components/landing/site-header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        {children}
      </div>
    </>
  );
}
