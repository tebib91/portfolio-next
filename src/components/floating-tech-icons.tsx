"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { getAllTechnologies } from "@/lib/cv-utils";
import { techIconMap, DefaultTechIcon } from "@/lib/tech-icons";
import { getTechWebsite } from "@/lib/tech-websites";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconPosition {
  left: number;
  top: number;
}

export function FloatingTechIcons() {
  // Memoize technologies to prevent infinite re-renders
  const technologies = useMemo(() => getAllTechnologies(), []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate positions with collision detection to prevent overlapping
  useEffect(() => {
    setIsMounted(true);
    
    // const iconSize = 3; // Icon size in percentage (48px / viewport)
    const minDistance = 6; // Minimum distance between icons in percentage
    const maxAttempts = 100; // Maximum attempts to find a valid position
    
    const positions: IconPosition[] = [];
    
    // Constrained area on left side (keep icons grouped)
    const leftMin = 1;
    const leftMax = 12;
    const topMin = 10;
    const topMax = 85;
    
    // Helper function to calculate distance between two points
    const getDistance = (pos1: IconPosition, pos2: IconPosition): number => {
      const dx = pos1.left - pos2.left;
      const dy = pos1.top - pos2.top;
      return Math.sqrt(dx * dx + dy * dy);
    };
    
    // Helper function to check if a position is too close to existing positions
    const isTooClose = (newPos: IconPosition, existingPositions: IconPosition[]): boolean => {
      return existingPositions.some(existingPos => {
        const distance = getDistance(newPos, existingPos);
        return distance < minDistance;
      });
    };
    
    // Generate positions for each technology
    technologies.forEach(() => {
      let attempts = 0;
      let position: IconPosition | null = null;
      
      // Try to find a valid position
      while (attempts < maxAttempts && !position) {
        const candidate: IconPosition = {
          left: leftMin + Math.random() * (leftMax - leftMin),
          top: topMin + Math.random() * (topMax - topMin),
        };
        
        // Check if this position is valid (not too close to others)
        if (!isTooClose(candidate, positions)) {
          position = candidate;
        }
        
        attempts++;
      }
      
      // If we couldn't find a valid position, use a fallback position
      if (!position) {
        // Try to place it near existing icons but with minimum spacing
        let fallbackAttempts = 0;
        while (fallbackAttempts < 50 && !position) {
          const baseIndex = Math.floor(Math.random() * positions.length);
          const basePos = positions[baseIndex];
          const angle = Math.random() * Math.PI * 2;
          const distance = minDistance + Math.random() * 2;
          
          const candidate: IconPosition = {
            left: Math.max(leftMin, Math.min(leftMax, basePos.left + Math.cos(angle) * distance)),
            top: Math.max(topMin, Math.min(topMax, basePos.top + Math.sin(angle) * distance)),
          };
          
          if (!isTooClose(candidate, positions)) {
            position = candidate;
          }
          fallbackAttempts++;
        }
      }
      
      // Final fallback: use a random position even if it might be close
      if (!position) {
        position = {
          left: leftMin + Math.random() * (leftMax - leftMin),
          top: topMin + Math.random() * (topMax - topMin),
        };
      }
      
      positions.push(position);
    });
    
    setIconPositions(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const iconVariants = {
    initial: {
      y: 0,
      scale: 1,
      opacity: 0.6,
    },
    animate: (index: number) => ({
      y: [0, -8, 0], // Reduced from -20 to -8 for subtle movement
      scale: 1, // Removed scale animation for subtlety
      opacity: [0.6, 0.7, 0.6], // Reduced opacity change
      transition: {
        duration: 4 + (index % 3) * 0.5, // Slower animation (4-6.5 seconds)
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: index * 0.15, // Reduced delay
      },
    }),
  };

  const hoverVariants = {
    scale: 1.15, // Reduced from 1.3 to 1.15 for subtle hover
    opacity: 1,
    y: -5, // Reduced from -10 to -5
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  };

  const handleClick = (tech: string) => {
    const url = getTechWebsite(tech);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Don't render until positions are generated (client-side only)
  if (!isMounted || iconPositions.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 hidden lg:block pointer-events-none">
      {technologies.map((tech, index) => {
        const IconUrl = techIconMap[tech] || DefaultTechIcon;
        const position = iconPositions[index];

        if (!position) return null;

        return (
          <motion.div
            key={tech}
            custom={index}
            initial="initial"
            animate="animate"
            variants={iconVariants}
            whileHover={hoverVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="absolute group pointer-events-auto"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          >
            <div
              onClick={() => handleClick(tech)}
              className={cn(
                "w-12 h-12 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                "flex items-center justify-center",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300",
                "cursor-pointer"
              )}
            >
              <Image src={IconUrl} alt={tech} width={24} height={24} />
            </div>
            {/* Tooltip */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm rounded-md whitespace-nowrap shadow-lg pointer-events-none z-50"
              >
                {tech}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-zinc-900 dark:border-r-zinc-100 border-b-4 border-b-transparent" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

