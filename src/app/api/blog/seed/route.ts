import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { EXAMPLE_POSTS } from '../data';

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const pipeline = redis.pipeline();
    EXAMPLE_POSTS.forEach(post => {
      pipeline.hset(`post:${post.slug}`, post);
    });
    await pipeline.exec();

    return NextResponse.json({ message: 'Blog posts seeded successfully' });
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    return NextResponse.json({ message: 'Error seeding blog posts' }, { status: 500 });
  }
}
