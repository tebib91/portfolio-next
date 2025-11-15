import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahmedtabib.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/cv"],
        disallow: ["/api/cv-download", "/api/views"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
