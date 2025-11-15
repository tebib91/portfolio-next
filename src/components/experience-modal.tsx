"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ExperienceModal({ open, onOpenChange, experience }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: any | null;
}) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {exp.title} — {exp.company}
          </DialogTitle>
          <DialogDescription>
            {exp.location} • {exp.period}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 grid gap-4">
          {exp.project && <p className="text-sm">{exp.project}</p>}

          {exp.tasks && (
            <div>
              <h4 className="font-medium">Tasks</h4>
              <ul className="mt-2 list-disc pl-5 text-sm">
                {exp.tasks.map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {exp.technologies && (
            <div>
              <h4 className="font-medium">Technologies</h4>
              <p className="text-sm mt-2">{exp.technologies.join(", ")}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
