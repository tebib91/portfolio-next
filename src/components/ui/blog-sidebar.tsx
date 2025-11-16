"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import type { BlogPost } from "@/app/api/blog/data";
import { useRouter } from "next/navigation";

export function BlogSidebar({ posts, activeSlug }: { posts: BlogPost[]; activeSlug?: string }) {
  const router = useRouter();

  return (
    <aside className="sticky top-16 space-y-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 p-3 max-h-[70vh] overflow-y-auto pr-1">
      <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
        <Newspaper className="w-5 h-5" />
        <h2 className="font-semibold cursor-pointer" onClick={() => router.push("/blog")}>All Posts</h2>
      </div>
      <ul className="space-y-2">
        {posts.map((p) => {
          const active = p.slug === activeSlug;
          return (
            <li key={p.id}>
              <Link href={`/blog/${p.slug}`} className={cn("flex items-center gap-3 rounded-lg border px-2 py-2", active ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900")}>                
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", active ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-200")}>{p.title}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">{p.description}</p>
                </div>
                <Button size="sm" variant={active ? "default" : "outline"} className="ml-auto">View</Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
