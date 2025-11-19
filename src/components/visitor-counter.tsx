"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
const isLocal =
  typeof window !== "undefined" && window.location.hostname === "localhost";
export function VisitorCounter({ initialCount }: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [isVisible, setIsVisible] = useState(false);

  function getVisitorId() {
    let id = localStorage.getItem("visitor-id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitor-id", id);
    }
    return id;
  }

  //call get view here
  useEffect(() => {
    const getViews = async () => {
      try {
        console.log('[VisitorCounter] Fetching initial view count...');
        const res = await fetch("/api/views", { cache: "no-store" });
        const data = await res.json();
        console.log('[VisitorCounter] Initial count:', data.total);
        setCount(data.total);
      } catch (e) {
        console.error('[VisitorCounter] Error fetching views:', e);
      }
    };
    getViews();
  }, []);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const id = getVisitorId();
        console.log('[VisitorCounter] Generated visitor ID:', id);
        console.log('[VisitorCounter] Incrementing view count...');

        const res = await fetch("/api/views", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        console.log('[VisitorCounter] POST response status:', res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('[VisitorCounter] POST failed:', errorText);
          throw new Error(`POST /api/views failed: ${res.status}`);
        }

        const data = await res.json();
        console.log('[VisitorCounter] Server message:', data.message);
        if (!data.alreadyExists) {
          toast(<div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
              <AvatarFallback className='text-xs'>HR</AvatarFallback>
            </Avatar>
            Hey Friend, Welcome to my portfolio!
          </div>, { id: "visitor-status" });
        }

        console.log('[VisitorCounter] Updated count:', data.total);
        setCount(data.total);


        setIsVisible(true);
      } catch (error) {
        console.error('[VisitorCounter] Error incrementing views:', error);
        toast('Could not update visitor count', { id: "visitor-status" });
        setIsVisible(true);
      }
    };


    // Skip incrementing views on local development
    // if (isLocal) {
    //   console.log('[VisitorCounter] Running on localhost, skipping increment');
    //   // eslint-disable-next-line react-hooks/set-state-in-effect
    //   setIsVisible(true);
    //   return;
    // }

    console.log('[VisitorCounter] Running on production, incrementing views...');
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
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-1">
          <AnimatedNumber value={count} />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            visitors
          </span>
        </div>
      </div>
    </motion.div>
  );
}
