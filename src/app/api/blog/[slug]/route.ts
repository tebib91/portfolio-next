import { NextResponse } from "next/server";
import { getPostBySlug } from "../data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  // unwrap params if it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;

  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}
