import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Get client IP and location info
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
    
    // Get user agent
    const userAgent = request.headers.get("user-agent") || "unknown";
    
    // Get referer
    const referer = request.headers.get("referer") || "direct";
    
    // Create download record
    const downloadRecord = {
      email,
      ip,
      userAgent,
      referer,
      timestamp: new Date().toISOString(),
    };

    // Save to database
    const downloadId = `cv-download:${Date.now()}:${Math.random().toString(36).substring(7)}`;
    await kv.set(downloadId, downloadRecord);
    
    // Also maintain a list of all downloads
    await kv.lpush("cv-downloads:list", downloadId);

    return NextResponse.json({ success: true, data: downloadRecord });
  } catch (error) {
    console.error("Error saving CV download:", error);
    return NextResponse.json(
      { error: "Failed to save download information" },
      { status: 500 }
    );
  }
}

