import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from "next/server";


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
export async function POST(request: NextRequest) {
  try {
    // Extract client IP similar to other routes
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // If we couldn't determine the IP, skip per-IP dedupe to avoid
    // grouping all unknown clients under the same key.
    if (ip === "unknown") {
      const views = await redis.incr("portfolio:views");
      return NextResponse.json({ total: views, incremented: true });
    }

    // Create a Redis key per IP with a TTL to prevent repeated increments from same IP.
    // We'll use a 24 hour window (86400 seconds).
    const ipKey = `portfolio:views:ip:${ip}`;

    const seen = await redis.get(ipKey);
    if (seen) {
      // IP was seen recently; return current total without incrementing
      const views = await redis.get<number>("portfolio:views");
      return NextResponse.json({ total: views || 0, incremented: false });
    }

    // Mark IP as seen with TTL
    await redis.set(ipKey, "1", { ex: 86400 });

    // Increment the global views counter
    const views = await redis.incr("portfolio:views");
    return NextResponse.json({ total: views, incremented: true });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
