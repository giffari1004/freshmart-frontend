import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t border-border bg-background">
        <div className="flex justify-center space-x-6 mb-2">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/help" className="hover:underline">
            Help Center
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
        <p>© {currentYear} FreshMart Grocery Inc.</p>
      </footer>
    </div>
  );
}
