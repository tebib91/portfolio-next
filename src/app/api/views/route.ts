import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from "next/server";

// Initialize Redis
const redis = Redis.fromEnv();

// In-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string, limit: number = 60, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Sanitize IP address (prevent injection)
function sanitizeIP(ip: string): string {
  return ip.replace(/[^0-9a-fA-F.:]/g, "").slice(0, 45); // IPv6 max length
}

// GET: Read current count without incrementing (for SSR/caching)
export async function GET(request: NextRequest) {
  try {
    const ip = getRateLimitKey(request);
    
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

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
    // Extract and sanitize client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIP = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
    const ip = sanitizeIP(rawIP);

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

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
