
import { kv } from '@vercel/kv';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  date: string; // ISO string
};

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await kv.get<BlogPost[]>("blog:posts");
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Error fetching posts from KV:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await kv.get<BlogPost>(`blog:post:${slug}`);
    if (post) return post;
    const all = await getPosts();
    return all.find((p) => p.slug === slug);
  } catch (error) {
    console.error(`Error fetching post ${slug} from KV:`, error);
    const all = await getPosts();
    return all.find((p) => p.slug === slug);
  }
}

export async function initializeBlogData(posts: BlogPost[]): Promise<void> {
  try {
    // Store all posts
    await kv.set("blog:posts", posts);
    
    // Store individual posts for faster lookup
    for (const post of posts) {
      await kv.set(`blog:post:${post.slug}`, post);
    }
    
    console.log("Blog data initialized successfully");
  } catch (error) {
    console.error("Error initializing blog data:", error);
    throw error;
  }
}

