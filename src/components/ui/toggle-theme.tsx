"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    // Preset accent colors (RGBA strings to allow transparency in gradients)
    const ACCENTS: { id: string; color: string; label?: string }[] = [
        { id: "blue", color: "rgba(59,130,246,0.18)", label: "Blue" },
        { id: "teal", color: "rgba(20,184,166,0.18)", label: "Teal" },
        { id: "purple", color: "rgba(124,58,237,0.18)", label: "Purple" },
        { id: "pink", color: "rgba(236,72,153,0.18)", label: "Pink" },
        { id: "amber", color: "rgba(251,191,36,0.18)", label: "Amber" },
    ];

    // Apply accent to document root and persist in localStorage
    const setAccent = (color: string, id?: string) => {
        if (typeof window === "undefined") return;
        try {
            document.documentElement.style.setProperty("--bg-accent", color);
            if (id) localStorage.setItem("bg-accent-id", id);
            localStorage.setItem("bg-accent", color);
        } catch (e) {
            // ignore
        }
    };

    // Load persisted accent on mount
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("bg-accent");
        if (saved) document.documentElement.style.setProperty("--bg-accent", saved);
    }, []);

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light") }>
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Accent color pickers */}
            <div className="flex gap-1">
                {ACCENTS.map((a) => (
                    <button
                        key={a.id}
                        aria-label={`Accent ${a.label ?? a.id}`}
                        title={`${a.label ?? a.id}`}
                        onClick={() => setAccent(a.color, a.id)}
                        className="h-8 w-8 rounded-full border border-zinc-200 dark:border-zinc-800"
                        style={{ backgroundColor: a.color }}
                    />
                ))}
            </div>
        </div>
    )
}
