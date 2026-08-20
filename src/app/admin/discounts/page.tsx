"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DirectDiscountTab } from "@/features/discount/direct/components/discount-tab";
import { MinPurchaseTab } from "@/features/discount/minimum-purchase/components/min-purchase-tab";
import { VoucherTab } from "@/features/discount/voucher/components/voucher-tab";

export default function DiscountsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Discount management
        </p>
        <h1 className="mt-1 font-serif text-3xl text-stone-900">Discounts</h1>
        <p className="mt-1 text-sm text-stone-500">
          Manage all discount and promotion programs
        </p>
      </div>

      <Tabs defaultValue="direct">
        <TabsList>
          <TabsTrigger value="direct">Direct Discount</TabsTrigger>
          <TabsTrigger value="min-purchase">Min. Purchase</TabsTrigger>
          <TabsTrigger value="bogo" disabled>Buy 1 Get 1</TabsTrigger>
          <TabsTrigger value="voucher">Vouchers</TabsTrigger>
        </TabsList>
        <TabsContent value="direct" className="pt-6">
          <DirectDiscountTab />
        </TabsContent>
        <TabsContent value="min-purchase" className="pt-6">
          <MinPurchaseTab />
        </TabsContent>
        <TabsContent value="voucher" className="pt-6">
          <VoucherTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}