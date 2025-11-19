import { Redis } from '@upstash/redis';
import { NextResponse } from "next/server";

// Initialize Redis
const redis = Redis.fromEnv();

// POST: Manually set visitor count (for admin purposes)
export async function POST(req: Request) {
  try {
    const { count } = await req.json();

    if (typeof count !== 'number' || count < 0) {
      return NextResponse.json(
        { error: 'Invalid count. Must be a positive number.' },
        { status: 400 }
      );
    }

    // Clear existing visitors
    await redis.del("portfolio:visitors");

    // Add dummy visitors to reach the desired count
    if (count > 0) {
      const visitors = Array.from({ length: count }, (_, i) => `visitor-${i}`);
      // @ts-expect-error - Redis sadd accepts variable number of arguments
      await redis.sadd("portfolio:visitors", ...visitors);
    }

    // Get the new total
    const total = await redis.scard("portfolio:visitors");

    return NextResponse.json({
      success: true,
      total,
      message: `Visitor count set to ${total}`
    });
  } catch (error) {
    console.error('Error setting visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to set visitor count' },
      { status: 500 }
    );
  }
}
