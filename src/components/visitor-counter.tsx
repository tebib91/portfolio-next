"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisitorCounterProps {
  initialCount: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, {
    damping: 15,
    stiffness: 100,
  });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}
export function VisitorCounter({ initialCount }: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
          cache: "no-store",
        });
        const data = await response.json();
  
        // Update both states together
        setCount(data.total);
        setIsVisible(true);
      } catch (error) {
        console.error("Failed to increment view count:", error);
        setIsVisible(true); // still show the badge
      }
    };

    incrementViews();
  }, []);
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "fixed bottom-4 right-4 z-20",
        "flex items-center gap-2 px-4 py-2",
        "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm",
        "border border-zinc-200 dark:border-zinc-800",
        "rounded-lg shadow-lg",
        "text-sm font-medium text-zinc-700 dark:text-zinc-300"
      )}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <Eye className="w-4 h-4 text-blue-500" />
      </motion.div>
      <div className="flex items-baseline gap-1">
        <AnimatedNumber value={count} />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          visitors
        </span>
      </div>
    </motion.div>
  );
}

