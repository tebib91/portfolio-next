import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

export async function GET() {
  try {
    // Store all posts
    await kv.set("blog:posts", blogPosts);
    
    // Store individual posts for faster lookup
    for (const post of blogPosts) {
      await kv.set(`blog:post:${post.slug}`, post);
    }

    return NextResponse.json({ message: 'Blog posts seeded successfully' });
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    return NextResponse.json({ message: 'Error seeding blog posts' }, { status: 500 });
  }
}
