"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/app/api/blog/data";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 ${featured ? "md:h-auto" : ""}`}>
      <div className={`relative ${featured ? "h-56 md:h-[24rem]" : "h-36"}`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
          className="object-cover"
          priority={featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white/80">
          <Calendar className="w-4 h-4" />
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className={`font-semibold ${featured ? "text-lg" : "text-base"} text-zinc-900 dark:text-white`}>{post.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
              <Tag className="w-3 h-3" /> {t}
            </span>
          ))}
        </div>

        <div className="mt-2">
          <Button variant="outline" className="group/button">
            Read more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
