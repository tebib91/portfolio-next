import { ModeToggle } from "@/components/ui/toggle-theme";
import { FloatingDockDemo } from "@/components/ui/dock";
import { FloatingTechIcons } from "@/components/floating-tech-icons";
import { VisitorCounterWrapper } from "@/components/visitor-counter-wrapper";
import { BlogSidebar } from "@/components/ui/blog-sidebar";
import type { BlogPost } from "@/app/api/blog/data";
import { getPostBySlug } from "@/app/api/blog/data";
import { baseUrl } from "@/lib/seo";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to parse markdown-like bold syntax and line breaks
function parseContent(content: string) {
  // Split by double newlines to get paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, pIndex) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;
    
    // Split paragraph into parts based on **bold** syntax
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    
    return (
      <p key={pIndex} className="mt-4 text-zinc-700 dark:text-zinc-300 leading-7 text-justify first:mt-0">
        {parts.map((part, index) => {
          // Check if this part is bold (wrapped in **)
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return (
              <strong key={index} className="font-semibold text-zinc-900 dark:text-white">
                {boldText}
              </strong>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    );
  });
}

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
          <div className="mt-6 flex justify-center">
            <Button asChild>
              <Link href="/blog">Go back</Link>
            </Button>
          </div>
        </main>
        <footer className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10">
          <FloatingDockDemo />
        </footer>
      </div>
    );
  }

  const postJson = (await postRes.json()) as { post: BlogPost };
  const postsJson = (await postsRes.json()) as { posts: BlogPost[] };
  const post = postJson.post;
  const posts = postsJson.posts;
  
  return (
    <div className="mx-auto max-w-5xl items-center justify-center font-sans relative">
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
          
          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
            {post.title}
          </h1>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <span 
                key={t} 
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300"
              >
                <Tag className="w-3 h-3" /> {t}
              </span>
            ))}
          </div>
          
          <div className="mt-6 space-y-4 overflow-y-auto">
            {parseContent(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  const url = `${baseUrl}/blog/${slug}`;
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      alternates: { canonical: url },
      robots: { index: false, follow: true },
    };
  }
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      images: [{ url: `${baseUrl}${post.image}`, width: 1200, height: 630 }],
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${baseUrl}${post.image}`],
    },
  };
}