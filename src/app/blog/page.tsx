import { BlogCard } from "@/components/ui/blog-card";
import { EXAMPLE_POSTS } from "@/app/api/blog/data";
import { Newspaper } from "lucide-react";

export default function Blog() {
  const [featured, ...others] = EXAMPLE_POSTS;
  return (
    <div className="items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
          <Newspaper className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Latest Posts</h1>
        </div>
        <div className="rounded-2xl border radius-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 p-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured post spans 2 cols and 2 rows on md+ */}
            <div className="md:col-span-2 md:row-span-2">
              <BlogCard post={featured} featured />
            </div>
            {others.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
