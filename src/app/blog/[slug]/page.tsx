import { ModeToggle } from "@/components/ui/toggle-theme";
import { BlogPostClient } from "@/components/blog-post-client";
import type { BlogPost } from "@/app/api/blog/data";
import { getPostBySlug } from "@/app/api/blog/data";
import { baseUrl } from "@/lib/seo";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
        <header className="absolute top-4 right-4 z-10"><ModeToggle /></header>
        <main className="mx-auto max-w-4xl px-6 py-20 text-center animate-fade-in-up">
          <div className="mb-8">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Post Not Found
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Button 
              asChild 
              className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900
                         transition-all duration-200 transform hover:scale-105"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>

      </div>
    );
  }

  const postJson = (await postRes.json()) as { post: BlogPost };
  const postsJson = (await postsRes.json()) as { posts: BlogPost[] };
  const post = postJson.post;
  const posts = postsJson.posts;
  
  return (
    <div className="items-center justify-center relative rounded-lg">
        <BlogPostClient post={post} posts={posts} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
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