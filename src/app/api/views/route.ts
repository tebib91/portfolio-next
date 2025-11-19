import { Redis } from '@upstash/redis';
import { NextResponse } from "next/server";



// Initialize Redis
const redis = Redis.fromEnv();


// GET: Read current count without incrementing (for SSR/caching)
export async function GET() {
  try {
    console.log('[API /views GET] Fetching visitor count...');
    const total = await redis.scard("portfolio:visitors");
    console.log('[API /views GET] Current total:', total);
    return NextResponse.json({ total }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error('[API /views GET] Error:', error);
    return NextResponse.json({ total: 0 });
  }
}


// POST: Increment the view count (called from client)
export async function POST(req: Request) {
  try {
    console.log('[API /views POST] Received request');
    const { id } = await req.json();
    console.log('[API /views POST] Visitor ID:', id);

    if (!id) {
      console.error('[API /views POST] No visitor ID provided');
      return NextResponse.json({ error: 'Visitor ID required', total: 0 }, { status: 400 });
    }

    // Add visitor
    const addResult = await redis.sadd("portfolio:visitors", id);
    console.log('[API /views POST] Redis SADD result:', addResult, '(1 = new visitor, 0 = existing)');

    const alreadyExists = addResult === 0;
    const status = alreadyExists ? 200 : 201;
    const message = alreadyExists ? 'Visitor already exists' : 'Visitor added';

    // Count unique visitors
    const total = await redis.scard("portfolio:visitors");
    console.log('[API /views POST] New total:', total);

    return NextResponse.json({
      total,
      alreadyExists,
      message,
    }, { status });
  } catch (error) {
    console.error('[API /views POST] Error:', error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
