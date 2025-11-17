"use client";

import { useEffect } from "react";
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
import { Experience } from "@/types/cv";

export function ExperienceModal({ open, onOpenChange, experience }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
}) {

  // Read accent color from localStorage and compute background class
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("bg-accent");
    // skip everything if nothing is saved
    if (!saved) return;
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
      <DialogContent className="max-w-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-2xl">
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <DialogHeader className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-white">
            {exp.title}
          </DialogTitle>
          <DialogDescription className="text-base text-zinc-600 dark:text-zinc-300 mt-2">
            <span className="font-semibold text-zinc-900 dark:text-white">{exp.company}</span>
            {" • "}<span className="text-zinc-700 dark:text-zinc-300">{exp.location}</span>
            {" • "}<span className="text-zinc-600 dark:text-zinc-400">{exp.period}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 grid gap-6 max-h-[60vh] overflow-y-auto">
          {/* Project Description */}
          {exp.project && (
            <div className="space-y-2">
              <h4 className="font-semibold text-zinc-900 dark:text-white text-sm uppercase tracking-wide">Project</h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{exp.project}</p>
            </div>
          )}

          {/* Tasks Section */}
          {exp.tasks && exp.tasks.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-zinc-900 dark:text-white text-sm uppercase tracking-wide">Key Responsibilities</h4>
              <ul className="space-y-2">
                {exp.tasks.map((t: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-blue-500" />
                    <span className="text-zinc-800 dark:text-zinc-200">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies with Animated Tooltip */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-zinc-900 dark:text-white text-sm uppercase tracking-wide">Technologies Used</h4>
              <div className="flex mx-auto items-center justify-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-neutral-900">
                {techItems.length > 0 && (
                  <AnimatedTooltip items={techItems} />
                )}
                {techItems.length === 0 && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{exp.technologies.join(", ")}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
