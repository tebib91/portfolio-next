import { Redis } from '@upstash/redis';
import { NextResponse } from "next/server";



// Initialize Redis
const redis = Redis.fromEnv();


// GET: Read current count without incrementing (for SSR/caching)
export async function GET() {
  try {
    const total = await redis.scard("portfolio:visitors");
    return NextResponse.json({ total }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ total: 0 });
  }
}


// POST: Increment the view count (called from client)
export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    // Add visitor
    await redis.sadd("portfolio:visitors", id);

    // Count unique visitors
    const total = await redis.scard("portfolio:visitors");

    return NextResponse.json({ total });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}

