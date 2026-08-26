"use client";

import React, { useRef } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { ProfileData } from "@/features/profile/api";
import { useUpdateAvatar } from "@/features/profile/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AvatarSectionProps {
  profile: ProfileData;
}

export function AvatarSection({ profile }: AvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: uploadAvatar, isPending } = useUpdateAvatar();

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please select a JPEG, PNG or GIF image.");
      return;
    }

    // Validate size (1MB enforced)
    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB limit.");
      return;
    }

    uploadAvatar(file);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border border-border bg-background rounded-lg mb-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Avatar with Pencil Badge */}
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar className="h-20 w-20 border border-border">
            <AvatarImage
              src={profile.avatarUrl || undefined}
              alt={profile.name}
            />
            <AvatarFallback className="text-lg font-bold bg-muted text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-2 border-background shadow-sm">
            <Pencil className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* User Details */}
        <div>
          <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            JPEG, PNG or GIF, Max 1MB
          </p>
        </div>
      </div>

      {/* Visually Hidden Input & Change Button */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        className="w-full sm:w-auto font-medium"
      >
        {isPending ? "Uploading..." : "Change Photo"}
      </Button>
    </div>
  );
}
