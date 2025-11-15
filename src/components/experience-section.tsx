"use client";

import React, { useState, useMemo } from "react";
import { WobbleCard } from "./ui/wobble-card";
import { ExperienceModal } from "@/components/experience-modal";
import { cvData } from "@/data/cv";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ExperienceSection({ open, onOpenChange }: ExperienceModalProps) {
  const [openExperienceModal, setOpenExperienceModal] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const openModalExperience = (exp: any) => {
    setSelected(exp);
    setOpenExperienceModal(true);
  };

  // Create stable random styles per experience so layout is varied but doesn't change on re-render
  const randomStyles = useMemo(() => {
    const bgOptions = [
      "bg-pink-800",
      "bg-amber-700",
      "bg-violet-700",
      "bg-sky-800",
      "bg-emerald-700",
      "bg-rose-800",
      "bg-indigo-700",
    ];
const colSpanPattern = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

    return cvData.experiences.map((_, index) => { 
      const bg = bgOptions[Math.floor(Math.random() * bgOptions.length)];
      const colSpan = colSpanPattern[index % colSpanPattern.length];
      const rotate = Math.random() > 0.95 ? "-rotate-1" : Math.random() > 0.95 ? "rotate-1" : "";
      return { bg, colSpan, rotate };
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription>Select an experience to view details</DialogDescription>
        </DialogHeader>

        {/* All experiences in a responsive 3-column grid with randomized styles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          {cvData.experiences.map((exp, idx) => {
            const style = randomStyles[idx] || { bg: "bg-zinc-700", colSpan: "lg:col-span-1", rotate: "" };
            const containerClass = `${style.colSpan} h-32 ${style.bg} rounded-2xl overflow-hidden ${style.rotate} relative`;
            return (
              <WobbleCard key={idx} containerClassName={containerClass} className="cursor-pointer">
                {/* Left text content, centered vertically */}
                <div onClick={() => openModalExperience(exp)} >
                <div className="absolute inset-0 flex flex-col justify-center p-4 z-10 w-1/2">
                  <h3 className="text-sm font-semibold text-white truncate">{exp.company}</h3>
                  <p className="text-xs text-neutral-200 truncate line-clamp-2">{exp.title}</p>
                  <p className="text-xs text-neutral-400 mt-1">{exp.period}</p>
                </div>
                {/* Right side decorative image background */}
                <img
                  src={exp.imageUrl}
                  width={300}
                  height={300}
                  alt="decor"
                  className="absolute -right-1 bottom-4 w-32 h-32 object-contain  opacity-60"
                />
                </div>
              </WobbleCard>
            );
          })}
        </div>

        <ExperienceModal open={openExperienceModal} onOpenChange={(v) => { setOpenExperienceModal(v); if (!v) setSelected(null); }} experience={selected} />
      </DialogContent>
    </Dialog>
  );
}
