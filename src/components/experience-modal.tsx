"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { techIconMap } from "@/lib/tech-icons";

export function ExperienceModal({ open, onOpenChange, experience }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: any | null;
}) {
  const [accentColor, setAccentColor] = useState<string | null>(null);
  const [accentBg, setAccentBg] = useState<string>("bg-blue-500");

  // Read accent color from localStorage and compute background class
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("bg-accent");
    if (saved) {
      setAccentColor(saved);
      // Extract color name from rgba for Tailwind-friendly class
      const colorMap: Record<string, string> = {
        "rgba(236,72,153,0.18)": "from-pink-500 to-pink-600",
        "rgba(20,184,166,0.18)": "from-teal-500 to-teal-600",
        "rgba(124,58,237,0.18)": "from-purple-500 to-purple-600",
        "rgba(251,191,36,0.18)": "from-amber-500 to-amber-600",
        "rgba(59,130,246,0.18)": "from-blue-500 to-blue-600",
      };
      setAccentBg(colorMap[saved] || "from-blue-500 to-blue-600");
    }
  }, [open]);

  if (!experience) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Experience</DialogTitle>
            <DialogDescription>No experience selected</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const exp = experience;

  // Map technologies to AnimatedTooltip format
  const techItems = (exp.technologies || []).map((tech: string, idx: number) => ({
    id: idx,
    name: tech,
    designation: "Technology",
    image: techIconMap[tech] || "/icons/default.png",
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-3xl border-0 shadow-2xl `}>
        {/* Accent gradient background */}
        <div className="absolute inset-0 -z-10 rounded-lg opacity-20" style={{ background: accentColor || "rgba(59,130,246,0.1)" }} />
        
        <DialogHeader className="border-b border-white/10 pb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            {exp.title}
          </DialogTitle>
          <DialogDescription className="text-base text-white/80 mt-2">
            <span className="font-semibold text-white">{exp.company}</span>
            {" • "}<span>{exp.location}</span>
            {" • "}<span className="text-white/70">{exp.period}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 grid gap-6 max-h-[60vh] overflow-y-auto">
          {/* Project Description */}
          {exp.project && (
            <div className="space-y-2">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Project</h4>
              <p className="text-sm text-white/80 leading-relaxed">{exp.project}</p>
            </div>
          )}

          {/* Tasks Section */}
          {exp.tasks && exp.tasks.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Key Responsibilities</h4>
              <ul className="space-y-2">
                {exp.tasks.map((t: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80">
                    <span 
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: accentColor ? "rgba(59,130,246,1)" : "rgba(59,130,246,1)" }}
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies with Animated Tooltip */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Technologies Used</h4>
              <div className="flex mx-auto items-center justify-center gap-4 p-4 rounded-lg  backdrop-blur-sm border border-white/10">
                {techItems.length > 0 && (
                  <AnimatedTooltip items={techItems} />
                )}
                {techItems.length === 0 && (
                  <p className="text-sm text-white/60">{exp.technologies.join(", ")}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-white/10 pt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
