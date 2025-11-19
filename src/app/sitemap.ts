import { MetadataRoute } from "next";
import { getPosts } from "./api/blog/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahmedtabib.com";
  const today = new Date().toISOString().split("T")[0];
  const posts = await getPosts();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api/cv`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.date.split("T")[0] || today,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseEntries, ...postEntries];
}
