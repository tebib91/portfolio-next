"use client";

import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { DownloadCvDialog } from "@/components/download-cv-dialog";
import {
  GithubIcon,
  HomeIcon,
  Download,
  Linkedin,
  BriefcaseIcon,
} from "lucide-react";
import { ExperienceSection } from "../wobble-card-demo";

export function FloatingDockDemo() {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Experience",
      icon: (
        <BriefcaseIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#experience",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsExperienceModalOpen(true);
      },
    },
    {
      title: "Download CV",
      icon: (
        <Download className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#download-cv",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDownloadDialogOpen(true);
      },
    },
    {
      title: "Linkedin",
      icon: (
        <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://ha.ahmedtabib.com",
    },
    {
      title: "GitHub",
      icon: (
        <GithubIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/tebib91",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center mr-auto w-full">
        <FloatingDock
          items={links}
        />
      </div>
      <DownloadCvDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
      />
      <ExperienceSection
        open={isExperienceModalOpen}
        onOpenChange={setIsExperienceModalOpen}
      />
    </>
  );
}
