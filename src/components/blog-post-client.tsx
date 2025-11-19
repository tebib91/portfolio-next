"use client"

import { BlogSidebar } from "@/components/ui/blog-sidebar";
import type { BlogPost } from "@/app/api/blog/data";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";

// Add custom styles for animations and enhanced UI
const BlogStyles = () => (
  <style jsx global>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    /* Enhanced scrollbar styling */
    .scrollbar-enhanced::-webkit-scrollbar {
      width: 6px;
    }
    
    .scrollbar-enhanced::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 3px;
    }
    
    .scrollbar-enhanced::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #d1d5db, #9ca3af);
      border-radius: 3px;
      transition: background 0.2s ease;
    }
    
    .dark .scrollbar-enhanced::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #374151, #4b5563);
    }
    
    .scrollbar-enhanced::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #9ca3af, #6b7280);
    }
    
    .dark .scrollbar-enhanced::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #4b5563, #6b7280);
    }
    
    /* Smooth scrolling behavior */
    html {
      scroll-behavior: smooth;
    }
  `}</style>
);

// Enhanced content parser with better animations and typography
function parseContent(content: string) {
  // Split by double newlines to get paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, pIndex) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;
    
    // Enhanced paragraph with fade-in animation and better spacing
    return (
      <p 
        key={pIndex} 
        className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify first:mt-0
                   transition-all duration-300 hover:text-zinc-800 dark:hover:text-zinc-200
                   animate-fade-in"
        style={{ animationDelay: `${pIndex * 100}ms` }}
      >
        {parseParagraphContent(paragraph, pIndex)}
      </p>
    );
  });
}

// Separate function to parse paragraph content with enhanced styling
function parseParagraphContent(paragraph: string, pIndex: number) {
  // Split paragraph into parts based on **bold** syntax
  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is bold (wrapped in **)
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong 
          key={`${pIndex}-${index}`} 
          className="font-semibold text-zinc-900 dark:text-white
                     bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300
                     bg-clip-text text-transparent"
        >
          {boldText}
        </strong>
      );
    }
    return <span key={`${pIndex}-${index}`}>{part}</span>;
  });
}

interface BlogPostClientProps {
  post: BlogPost;
  posts: BlogPost[];
}

export function BlogPostClient({ post, posts }: BlogPostClientProps) {
  return (
    <div className="mx-auto max-w-6xl items-center justify-center font-sans relative px-4 sm:px-6 lg:px-8 py-8">
      <BlogStyles />
      {/* Enhanced layout with better spacing and smooth animations */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[calc(100vh-12rem)] transition-all duration-300 ease-in-out animate-fade-in-up">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <BlogSidebar posts={posts} activeSlug={post.slug} />
          </div>
        </div>

        <article className="lg:col-span-2 overflow-y-auto lg:max-h-[calc(100vh-16rem)] scrollbar-enhanced">
          {/* Hero image with enhanced styling */}
          <div className="relative h-64 lg:h-72 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover transition-transform duration-500 hover:scale-105" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-sm text-white/90 backdrop-blur-sm bg-black/20 rounded-lg px-3 py-2 border border-white/20">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
          
          {/* Title with enhanced typography */}
          <h1 className="mt-8 text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight animate-fade-in">
            {post.title}
          </h1>
          
          {/* Tags with improved styling */}
          <div className="mt-6 flex flex-wrap gap-3">
            {post.tags.map((t: string, index: number) => (
              <span 
                key={t} 
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 cursor-default animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <Tag className="w-3.5 h-3.5" /> {t}
              </span>
            ))}
          </div>
          
          {/* Content with enhanced spacing and typography */}
          <div className="mt-10 space-y-6 leading-relaxed text-lg">
            {parseContent(post.content)}
          </div>
          
          {/* Bottom spacing */}
          <div className="mt-16 pb-8" />
        </article>
      </div>
    </div>
  );
}