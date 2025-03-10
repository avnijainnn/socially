import { getDbUserId } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getBlogs } from '@/actions/blog.action';
import SearchClient from '@/components/SearchClient';

export default async function Home() {
  const user = await currentUser();
  const blogs = await getBlogs();
  const dbUserId = await getDbUserId();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {user ? (
          <>
            <h1 className="text-4xl font-bold">My Tech Interviews</h1>
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
        <SearchClient blogs={blogs} dbUserId={dbUserId ?? ''} />
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No posts yet.</p>
          <Link
            href="/create-blog"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Create your first interview post
          </Link>
        </div>
      )}
    </main>
  );
}

