  // import { AppProviders } from "@/providers/app-providers";
  // import "leaflet/dist/leaflet.css"
  // import "./globals.css";
  // export default function RootLayout({
  //   children,
  // }: {
  //   children: React.ReactNode;
  // }) {
  //   return (
  //     <html lang="id">
  //       <body>
  //         <AppProviders>{children}</AppProviders>
  //       </body>
  //     </html>
  //   );
  // }
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={jakarta.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}