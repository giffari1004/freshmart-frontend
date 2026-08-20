"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Globe, AtSign, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});
type NewsletterInput = z.infer<typeof newsletterSchema>;

const COMPANY_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Partner Program", href: "#" },
  { label: "Blog", href: "#" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#" },
  { label: "Safety Center", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function SiteFooter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  function onSubmit(data: NewsletterInput) {
    // TODO: belum ada endpoint newsletter subscription di backend —
    // sementara cuma feedback UI, sambungkan ke API asli kalau fiturnya
    // sudah dibuat.
    toast.success(`Thanks for subscribing, ${data.email}!`);
    reset();
  }

  return (
    <footer className="mt-16 w-full border-t border-border bg-muted px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-freshmart.png"
              alt="FreshMart"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-bold text-primary">FreshMart</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Freshness delivered straight to your door. The most reliable way
            to shop for quality groceries online.
          </p>
          <div className="flex gap-4">
            <button
              aria-label="Website"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              aria-label="Contact"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <AtSign className="h-5 w-5" />
            </button>
            <button
              aria-label="Share"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
        <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />

        <div className="space-y-3">
          <h5 className="font-semibold text-foreground">Stay Updated</h5>
          <p className="text-sm text-muted-foreground">
            Sign up for fresh deals and new product alerts.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-2"
          >
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-background"
                {...register("email")}
              />
              <Button type="submit" disabled={isSubmitting}>
                Join
              </Button>
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FreshMart Grocery Inc. All rights
          reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <span>English (US)</span>
          <span>IDR (Rp)</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-3">
      <h5 className="font-semibold text-foreground">{title}</h5>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
