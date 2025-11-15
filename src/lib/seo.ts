import { Metadata } from "next";
import { title } from "process";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ahmedtabib.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Ahmed Tabib | Full Stack Developer & NestJS/Angular/AWS Consultant",
  description: "Full Stack JavaScript developer with 10+ years of experience. Expert in NestJS, Angular, React, AWS, and DevOps. Available for consulting.",
  keywords: [
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
    "NestJS",
    "Angular",
    "React",
    "AWS",
    "Node.js",
    "Consultant",
    "Web Development",
    "Cloud Architecture",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "DynamoDB",
    "CI/CD",
  ],
  authors: [
    {
      name: "Ahmed Tabib",
      url: baseUrl,
    },
  ],
  creator: "Ahmed Tabib",
  publisher: "Ahmed Tabib",
  openGraph: {
    type: "profile",
    url: baseUrl,
    title: "Ahmed Tabib | Full Stack Developer & NestJS/Angular/AWS Consultant",
    description: "Experienced Full Stack consultant specializing in backend & frontend development with modern cloud technologies.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ahmed Tabib Portfolio",
      },
    ],
    emails: ["me@ahmedtabib.com"],
    siteName: "Ahmed Tabib Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Tabib | Full Stack Developer & Consultant",
    description: "NestJS | Angular | React | AWS | 10+ years experience",
    images: [`${baseUrl}/og-image.png`],
    creator: "@tebib91",
    site: "@tebib91",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? {
          "msvalidate.01": process.env.BING_SITE_VERIFICATION,
        }
      : undefined,
  },
};

  // Structured data for Google, LinkedIn, etc.
export const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    title: "Ahmed Tabib | Full Stack Developer & NestJS/Angular/AWS Consultant",
    name: "Ahmed Tabib",
    url: baseUrl,
    email: "me@ahmedtabib.com",
    jobTitle: "Full Stack Developer & Consultant",
    description: "Full Stack JavaScript developer with 10+ years of experience in web development and cloud architecture.",
    sameAs: [
      "https://github.com/tebib91",
      "https://linkedin.com/in/ahmed-tabib-js",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "NestJS",
      "Angular",
      "React",
      "AWS",
      "Node.js",
      "Docker",
      "Kubernetes",
      "MongoDB",
    ],
  };