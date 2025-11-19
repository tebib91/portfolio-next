import { BlogCard } from "@/components/ui/blog-card";
import { getPosts } from "@/app/api/blog/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inbox, Newspaper } from "lucide-react";
import { baseUrl } from "@/lib/seo";
import { Metadata } from "next";

export default async function Blog() {
  const posts = await getPosts();
  const [featured, ...others] = posts;
  return (
    <div className="items-center justify-center bg-zinc-50 font-sans dark:bg-black relative rounded-2xl">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
          <Newspaper className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Latest Posts</h1>
        </div>
        <div className="rounded-2xl border radius-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 p-4 max-h-[70vh] overflow-y-auto">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-600 dark:text-zinc-300">
              <Inbox className="w-6 h-6 mb-2" />
              <p className="text-sm">No posts found</p>
              <Link href="/">
                <Button variant="outline" className="mt-3">Go home</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 md:row-span-2">
                <BlogCard post={featured} featured />
              </div>
              {others.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog | Ahmed Tabib | Full Stack Developer",
  description:
    "Latest articles on web development, architecture, and performance. Expert insights on NestJS, Angular, React, AWS, and modern cloud technologies.",
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    type: "website",
    url: `${baseUrl}/blog`,
    title: "Blog | Ahmed Tabib | Full Stack Developer",
    description:
      "Latest articles on web development, architecture, and performance. Expert insights on NestJS, Angular, React, AWS, and modern cloud technologies.",
    images: [`${baseUrl}/og-image.png`],
    siteName: "Ahmed Tabib Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ahmed Tabib | Full Stack Developer",
    description:
      "Latest articles on web development, architecture, and performance. Expert insights on NestJS, Angular, React, AWS, and modern cloud technologies.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@tebib91",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};
