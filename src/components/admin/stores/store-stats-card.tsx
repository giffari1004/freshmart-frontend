"use client";

import { Store, CheckCircle2, Truck, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StoreStatsCardsProps {
  totalStores?: number;
  activeNow?: number;
  avgRadiusKm?: number;
  understaffed?: number;
}

export function StoreStatsCards({
  totalStores,
  activeNow,
  avgRadiusKm,
  understaffed,
}: StoreStatsCardsProps) {
  const stats = [
    {
      title: "TOTAL STORES",
      value: totalStores !== undefined ? totalStores : "—",
      icon: Store,
      bgColor:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      title: "ACTIVE NOW",
      value: activeNow !== undefined ? activeNow : "—",
      icon: CheckCircle2,
      bgColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      title: "AVG RADIUS",
      value: avgRadiusKm !== undefined ? `${avgRadiusKm} km` : "—",
      icon: Truck,
      bgColor:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      title: "UNDERSTAFFED",
      value: understaffed !== undefined ? understaffed : "—",
      icon: AlertTriangle,
      bgColor: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  {stat.title}
                </p>
                <p className="text-2xl font-black text-foreground">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
