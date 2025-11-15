import { Redis } from '@upstash/redis';
import { NextResponse } from "next/server";



// Initialize Redis
const redis = Redis.fromEnv();


// GET: Read current count without incrementing (for SSR/caching)
export async function GET() {
  try {
    const views = await redis.get<number>("portfolio:views");
    return NextResponse.json({ total: views || 0 }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ total: 0 });
  }
}

// POST: Increment the view count (called from client)
export async function POST() {
  try {
    const views = await redis.incr("portfolio:views");
    return NextResponse.json({ total: views });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
