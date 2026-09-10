"use client";

import Script from "next/script";

export function MidtransScript() {
  const handleReady = () => {
    window.dispatchEvent(new Event("midtrans:snap-ready"));
  };

  return (
    <Script
      id="midtrans-snap-script"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      strategy="afterInteractive"
      onReady={handleReady}
    />
  );
}