"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { TypewriterEffectDemo } from "./typewriter-effect-demo";

export function BackgroundGrid() {
  return (
    <div className=" flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20 py-8">
        <TypewriterEffectDemo />
      </div>
    </div>
  );
}
