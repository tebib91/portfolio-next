import { NextResponse } from "next/server";
import { getPosts } from "./data";

export async function GET() {
  const posts = getPosts();
  return NextResponse.json({ posts });
}

