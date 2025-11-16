import { ModeToggle } from "@/components/ui/toggle-theme";
import { FloatingDockDemo } from "@/components/ui/dock";
import { FloatingTechIcons } from "@/components/floating-tech-icons";
import { VisitorCounterWrapper } from "@/components/visitor-counter-wrapper";
import { BlogSidebar } from "@/components/ui/blog-sidebar";
import type { BlogPost } from "@/app/api/blog/data";
// Build a base URL for server-side fetching in dev/prod
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "localhost:3001";
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const [postRes, postsRes] = await Promise.all([
    fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/blog`, { cache: "no-store" }),
  ]);
  
  if (!postRes.ok) {
    return (
      <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">
        <header className="absolute top-2 right-2 z-10"><ModeToggle /></header>
        <main className="mx-auto max-w-4xl px-4 py-16">
          <p className="text-center text-zinc-700 dark:text-zinc-300">Post not found.</p>
          <div className="mt-6 flex justify-center"><Button asChild><Link href="/blog">Go back</Link></Button></div>
        </main>
        <footer className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10"><FloatingDockDemo /></footer>
      </div>
    );
  }

  const postJson = (await postRes.json()) as { post: BlogPost };
  const postsJson = (await postsRes.json()) as { posts: BlogPost[] };
  const post = postJson.post;
  const posts = postsJson.posts;
  
  return (
    <div className="mx-auto max-w-5xl items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">


        {/* 1/3 - 2/3 layout inside bordered container */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <BlogSidebar posts={posts} activeSlug={post.slug} />
          </div>

          <article className="lg:col-span-2">
            <div className="relative h-56 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-white/80">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
            <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <Tag className="w-3 h-3" /> {t}
                </span>
              ))}
            </div>
            <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-7">{post.content}</p>
          </article>
        </div>

    </div>
  );
}
