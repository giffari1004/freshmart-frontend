  import { AppProviders } from "@/providers/app-providers";
  import "leaflet/dist/leaflet.css"
  import "./globals.css";
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="id">
        <body>
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    );
  }
