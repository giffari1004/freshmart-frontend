"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesTabReport } from "@/features/report/sales-report/components/sales-tab-report"
import { StockTabReport } from "@/features/report/stock-report/components/stock-tab-report"

export default function ReportsPage(){
    return (
        <div className="mx-auto max-w-5xl space-y-6 p-8">
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                    Reporting
                </p>
                <h1 className="mt-1 font-serif text-3xl text-stone-900">Reports</h1>
                <p className="mt-1 text-sm text-stone-500">View sales and stock reports accross stores , products , categories</p>
            </div>
            <Tabs defaultValue="sales">
                <TabsList>
                    <TabsTrigger value="sales">Sales report</TabsTrigger>
                    <TabsTrigger value="stock">Stock report</TabsTrigger>
                </TabsList>
                <TabsContent value="sales" className="pt-6">
                   <SalesTabReport/> 
                </TabsContent>
                <TabsContent value="stock" className="pt-6">
                    <StockTabReport/>
                </TabsContent>
            </Tabs>
        </div>
    )
}