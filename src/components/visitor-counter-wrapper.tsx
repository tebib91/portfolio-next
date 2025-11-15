import { VisitorCounter } from "./visitor-counter";
import { kv } from "@vercel/kv";

async function getInitialViewCount(): Promise<number> {
  try {
    const views = await kv.get<number>("portfolio:views");
    return views || 0;
  } catch (error) {
    console.error("Failed to fetch initial view count:", error);
    return 0;
  }
}

export async function VisitorCounterWrapper() {
  const initialCount = await getInitialViewCount();

  return <VisitorCounter initialCount={initialCount} />;
}

