import { NextResponse } from "next/server";
import { initializeBlogData } from "../data";
import { blogPosts } from "@/data/blog";

export async function POST() {
  try {
    await initializeBlogData(blogPosts);
    return NextResponse.json({ success: true, message: "Blog data initialized" });
  } catch (error) {
    console.error("Error initializing blog data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize blog data" },
      { status: 500 }
    );
  }
}