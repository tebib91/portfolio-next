"use client";

import { useState, useMemo } from "react";
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
import Image from "next/image";
import { Experience } from "@/types/cv";

interface ExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ExperienceSection({ open, onOpenChange }: ExperienceModalProps) {
  const [openExperienceModal, setOpenExperienceModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const openModalExperience = (exp: Experience) => {
    setSelected(exp);
    setOpenExperienceModal(true);
  };

  // Create stable random styles per experience using deterministic seeding based on index
  // This ensures styles don't change on re-render but still look varied
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
      // Use deterministic "random" based on index to avoid impure function errors
      const bgIndex = (index * 7) % bgOptions.length;
      const bg = bgOptions[bgIndex];
      const colSpan = colSpanPattern[index % colSpanPattern.length];
      // Rotate based on index: every 20th card gets a slight rotation
      const rotateIndex = index % 20;
      const rotate = rotateIndex === 0 ? "-rotate-1" : rotateIndex === 10 ? "rotate-1" : "";
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
                <Image
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
