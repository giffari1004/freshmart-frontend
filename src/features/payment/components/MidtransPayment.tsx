"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface MidtransPaymentProps { snapToken: string; }
interface SnapOptions { onSuccess?: (result: unknown) => void; onPending?: (result: unknown) => void; onError?: (result: unknown) => void; onClose?: () => void; }
declare global { interface Window { snap?: { pay: (token: string, options?: SnapOptions) => void }; } }

export function MidtransPayment({ snapToken }: MidtransPaymentProps) { const [ready, setReady] = useState(false); useOpenSnap(snapToken, ready); return <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="afterInteractive" onReady={() => setReady(true)} />; }
function useOpenSnap(token: string, ready: boolean) { const opened = useRef(false); useEffect(() => { if (!token || !ready || !window.snap || opened.current) return; opened.current = true; window.snap.pay(token); }, [token, ready]); }
