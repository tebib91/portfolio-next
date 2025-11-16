export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: string; // ISO string
};

export const EXAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "scaling-nextjs-on-vercel",
    title: "Scaling Next.js Applications on Vercel",
    description: "Best practices for performance, caching, and SEO when deploying Next.js to Vercel.",
    content:
      "Learn how to leverage edge caching, server components, and route handlers to scale Next.js apps. We cover performance budgets, image optimization, and pragmatic API design.",
    image: "/images/sncf-connect.png",
    tags: ["Next.js", "Performance", "Vercel"],
    date: "2024-09-10T09:00:00.000Z",
  },
  {
    id: "2",
    slug: "designing-react-ui-systems",
    title: "Designing Robust UI Systems in React",
    description: "How to structure reusable UI with ShadCN components and Tailwind.",
    content:
      "We explore composition patterns, accessibility, and styling consistency using a UI primitives approach. Includes examples with buttons, dialogs, and cards.",
    image: "/images/orange.png",
    tags: ["React", "UI", "ShadCN"],
    date: "2024-08-22T12:30:00.000Z",
  },
  {
    id: "3",
    slug: "api-design-for-speed",
    title: "API Design for Speed and Simplicity",
    description: "Patterns to keep APIs fast, observable, and easy to use.",
    content:
      "From pagination strategies to caching headers, we walk through practical techniques that improve API latency and developer experience.",
    image: "/images/sfr.webp",
    tags: ["API", "Caching", "DX"],
    date: "2024-07-05T08:15:00.000Z",
  },
  {
    id: "4",
    slug: "frontend-observability",
    title: "Frontend Observability That Works",
    description: "Instrumenting user journeys, errors, and performance with minimal overhead.",
    content:
      "We discuss metrics to track, useful dashboards, and hints for correlating backend traces with frontend events.",
    image: "/images/vynd.jpeg",
    tags: ["Observability", "Frontend", "Metrics"],
    date: "2024-06-14T16:00:00.000Z",
  },
  {
    id: "5",
    slug: "async-architectures",
    title: "Async Architectures: Messaging and Queues",
    description: "Building resilient systems with retries, DLQs, and idempotency.",
    content:
      "We break down common patterns for processing workloads asynchronously, including event sourcing, exactly-once semantics, and backpressure controls.",
    image: "/images/auna.png",
    tags: ["Architecture", "Async", "Queues"],
    date: "2024-05-02T10:45:00.000Z",
  },
];

export function getPosts(): BlogPost[] {
  // In a real app, fetch from DB here
  return EXAMPLE_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  console.log(slug,'jdjsd');
  
  return EXAMPLE_POSTS.find((p) => p.slug === slug);
}

