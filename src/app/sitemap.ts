import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahmedtabib.com";
  const today = new Date().toISOString().split('T')[0];

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/api/cv`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
