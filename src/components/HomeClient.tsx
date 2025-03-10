"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import BlogCard from '@/components/BlogCard';
import { Plus } from 'lucide-react';
import SearchForm from '@/components/SearchForm';

interface HomeClientProps {
  user: any;
  blogs: any[];
  dbUserId: string;
}

export default function HomeClient({ user, blogs, dbUserId }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {user ? (
          <>
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            <Link
              href="/create-blog"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </Link>
          </>
        ) : null}
      </div>
      <div>
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        >
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} dbUserId={dbUserId} />
          ))}
        </Suspense>
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No blog posts yet.</p>
          <Link
            href="/create-blog"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Create your first post
          </Link>
        </div>
      )}
    </main>
  );
}
