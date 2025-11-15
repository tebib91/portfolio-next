import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  GithubIcon,
  XIcon,
  HomeIcon,
  SectionIcon,
  TerminalIcon,
} from "lucide-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <TerminalIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <SectionIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <XIcon  className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Home Assistant",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
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
    <div className="flex items-center justify-center mr-auto w-full">
      <FloatingDock
        // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
