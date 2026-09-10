import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreshMart",
  description: "Fresh groceries delivered to your door",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}