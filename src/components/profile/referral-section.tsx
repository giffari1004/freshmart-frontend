"use client";

import { Copy, Gift, Users } from "lucide-react";
import { toast } from "sonner";

import { ProfileData } from "@/features/profile/api";

interface ReferralSectionProps {
  profile: ProfileData;
}

export function ReferralSection({ profile }: ReferralSectionProps) {
  const referralCode = profile.referralCode;

  const copyReferralCode = async () => {
    if (!referralCode) return;

    await navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied");
  };

  const referralLink = referralCode
    ? `${window.location.origin}/register?ref=${referralCode}`
    : "";

  const copyReferralLink = async () => {
    if (!referralLink) return;

    await navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied");
  };

  return (
    <section className="border border-border bg-background rounded-xl shadow-sm p-6">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Gift className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">
            Referral Program
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Share your referral code with friends and earn rewards.
          </p>

          <div className="mt-5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              YOUR REFERRAL CODE
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 h-11 border border-border rounded-lg px-4 flex items-center font-bold tracking-wider">
                {referralCode || "Not available"}
              </div>

              <button
                type="button"
                onClick={copyReferralCode}
                disabled={!referralCode}
                className="h-11 px-4 rounded-lg border border-border hover:bg-muted disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Copy className="h-4 w-4" />
                Copy Code
              </button>
            </div>
          </div>

          {referralCode && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                YOUR REFERRAL LINK
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 min-w-0 h-11 border border-border rounded-lg px-4 flex items-center text-sm text-muted-foreground truncate">
                  {referralLink}
                </div>

                <button
                  type="button"
                  onClick={copyReferralLink}
                  className="h-11 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <Users className="h-4 w-4" />
                  Copy Link
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Friends who register using your referral link will receive a
            referral voucher after verifying their account.
          </p>
        </div>
      </div>
    </section>
  );
}
