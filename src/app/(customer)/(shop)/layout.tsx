import { SiteHeader } from "@/components/landing/site-header";
import { AccountNav } from "@/components/shared/account-nav";
import React from "react";


export default function ShopLayout({
    children, 
} : {children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader showSearch={false} />
            <div className="mx-auto max-w-5xl px-4 py-8">
                <AccountNav/>
                {children}
            </div>
        </div>
    )
}