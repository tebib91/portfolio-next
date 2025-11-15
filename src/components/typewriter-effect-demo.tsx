"use client";

import { TypewriterEffect } from "./ui/typewriter-effect";
import { cvData } from "@/data/cv";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Hi,",
    },
    {
      text: "I'm",
    },
    {
      text: cvData.name,
      className: "text-blue-500 dark:text-blue-500",
    },

    {
      text: "\n",
    },
    {
      text: cvData.title,
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "with",
    },
    {
      text: `${cvData.experienceYears}+`,
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "years",
    },
    {
      text: "of",
    },
    {
      text: "experience",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
        Welcome to my portfolio
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}

