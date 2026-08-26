"use client";

import React from "react";

import { useProfile } from "@/features/profile/hooks";
import { VerificationBanner } from "@/components/profile/verification-banner";
import { AvatarSection } from "@/components/profile/avatar-section";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 animate-pulse space-y-6">
        <div className="h-14 bg-muted rounded-lg w-full" />
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-32 bg-muted rounded-lg w-full" />
        <div className="h-64 bg-muted rounded-lg w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <VerificationBanner profile={profile} />

      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
        Account Settings
      </h1>

      <AvatarSection profile={profile} />

      {/* Main Card wrapper wrapping both Tabs Header & Form Content */}
      <div className="border border-border bg-background rounded-xl shadow-sm overflow-hidden">
        <Tabs defaultValue="personal-info" className="w-full">
          <div className="border-b border-border bg-background px-6 pt-3">
            <TabsList className="bg-transparent h-auto p-0 gap-6 rounded-none">
              <TabsTrigger
                value="personal-info"
                className="py-3 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-sm text-muted-foreground data-[state=active]:text-primary"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="change-password"
                className="py-3 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-sm text-muted-foreground data-[state=active]:text-primary"
              >
                Change Password
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent
              value="personal-info"
              className="mt-0 focus-visible:outline-none"
            >
              <PersonalInfoForm profile={profile} />
            </TabsContent>

            <TabsContent
              value="change-password"
              className="mt-0 focus-visible:outline-none"
            >
              <ChangePasswordForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
