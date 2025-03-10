"use client";

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import BlogCard from '@/components/BlogCard';

interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    image: string | null;
    username: string;
    name: string | null;
  };
}

interface SearchClientProps {
  blogs: Blog[];
  dbUserId: string;
}

export default function SearchClient({ blogs, dbUserId }: SearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} dbUserId={dbUserId} />
        ))}
      </div>
      {filteredBlogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No blog posts yet.</p>
        </div>
      )}
    </>
  );
}
