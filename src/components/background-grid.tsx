"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TypewriterEffectDemo } from "./typewriter-effect-demo";

export function BackgroundGrid() {

  const [bgColor, setBgColor] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get your accent color from localStorage
    if (typeof window === "undefined") return;
    const storedColor = localStorage.getItem("bg-accent");
    console.log("storedColor (from localStorage):", storedColor);
    if (storedColor) {
      setBgColor(storedColor);
    } else {
      setBgColor(null);
    }

    // detect dark mode class on the document root
    setIsDark(document.documentElement.classList.contains("dark"));
    
  }, []);

  // Log when bgColor actually updates
  useEffect(() => {
    console.log("bgColor updated:", bgColor);
  }, [bgColor]);
  
  // Inline styles for the dot grid and the accent overlay so we can use dynamic colors
  const dotBgStyle: React.CSSProperties = {
    backgroundSize: "20px 20px",
    // Use CSS variable --bg-accent for the dot color so changes apply immediately
    backgroundImage: isDark
      ? `radial-gradient(#404040 1px, var(--bg-accent, transparent) 1px)`
      : `radial-gradient(#d4d4d4 1px, var(--bg-accent, transparent) 1px)`,
  };
  // Accent overlay uses CSS variable so updates happen immediately
  const accentStyle: React.CSSProperties = {
    background: `radial-gradient(closest-side, var(--bg-accent, rgba(59,130,246,0.12)), transparent)`,
    mixBlendMode: "overlay",
  };

  return (
    <div className="flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div className="absolute inset-0" style={dotBgStyle} />

      {/* Radial gradient for the container to give a faded look; accent overlay is inside */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black">
        {accentStyle ? <div className="absolute inset-0 pointer-events-none" style={accentStyle} /> : null}
      </div>
      <div className="relative z-20 py-8">
        <TypewriterEffectDemo />
      </div>
    </div>
  );
}
