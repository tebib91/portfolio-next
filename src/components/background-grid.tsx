"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export function BackgroundGrid({ children }: { children: React.ReactNode }) {
  // Use state to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted to true after component mounts on client
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use CSS classes instead of inline styles for hydration safety
  const dotGridClass = isMounted 
    ? "bg-[radial-gradient(#404040_1px,var(--bg-accent,transparent)_1px)] dark:bg-[radial-gradient(#d4d4d4_1px,var(--bg-accent,transparent)_1px)]"
    : "bg-[radial-gradient(#d4d4d4_1px,var(--bg-accent,transparent)_1px)]";

  // Use CSS classes for accent overlay to avoid hydration issues
  const accentClass = "bg-[radial-gradient(closest-side,var(--bg-accent,rgba(59,130,246,0.12)),transparent)]";
  return (
    <div className="flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div className={cn("absolute inset-0 bg-[length:20px_20px]", dotGridClass)} />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black">
        <div className={cn("absolute inset-0 pointer-events-none mix-blend-overlay", accentClass)} />
      </div>
      <div className="relative z-20 py-8">
        {/* children here  */}
        {children}
      </div>
    </div>
  );
}
