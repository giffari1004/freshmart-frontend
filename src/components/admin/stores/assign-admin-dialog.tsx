"use client";

import { useState } from "react";
import { Search, Info, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useSearchStoreAdminUsers,
  useAssignStoreAdmin,
} from "@/features/store/hooks";

interface AssignAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeId: string;
  storeName: string;
  currentAdminName?: string | null;
}

export function AssignAdminDialog({
  open,
  onOpenChange,
  storeId,
  storeName,
  currentAdminName,
}: AssignAdminDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: usersResponse, isLoading } =
    useSearchStoreAdminUsers(searchQuery);
  const assignMutation = useAssignStoreAdmin();

  const users = usersResponse?.data ?? [];

  const handleAssign = () => {
    if (!selectedUserId) return;

    assignMutation.mutate(
      { storeId, userId: selectedUserId },
      {
        onSuccess: () => {
          setSelectedUserId(null);
          setSearchQuery("");
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Store Admin — {storeName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {currentAdminName && (
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
              <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <p className="text-xs leading-relaxed">
                This store already has an admin assigned. Assigning a new one
                will replace the current admin.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Select User
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search user name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="max-h-56 min-h-35 overflow-y-auto rounded-md border p-1 space-y-1">
            {isLoading && (
              <p className="p-4 text-center text-xs text-muted-foreground">
                Searching...
              </p>
            )}

            {!isLoading && searchQuery.trim().length < 2 && (
              <p className="p-4 text-center text-xs text-muted-foreground">
                Type at least 2 characters to search admins
              </p>
            )}

            {!isLoading &&
              searchQuery.trim().length >= 2 &&
              users.length === 0 && (
                <p className="p-4 text-center text-xs text-muted-foreground">
                  No users found
                </p>
              )}

            {users.map((user) => {
              const isSelected = selectedUserId === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors ${
                    isSelected ? "bg-accent" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedUserId || assignMutation.isPending}
          >
            {assignMutation.isPending ? "Assigning..." : "Assign Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
