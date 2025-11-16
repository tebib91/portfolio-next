import { VisitorCounter } from "./visitor-counter";
import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = Redis.fromEnv();

async function getInitialViewCount(): Promise<number> {
  try {
    const views = await redis.get<number>("portfolio:views");
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

