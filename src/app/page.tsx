import { getPosts } from "@/actions/post.action";
//import { getStartups } from "@/actions/startup.action";
import { getDbUserId } from "@/actions/user.action";
//import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/PostCard";
//import StartupForm from "@/components/StartupForm";
//import StartupCard from "@/components/StartupCard";
// import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// //import WhoToFollow from "@/components/WhoToFollow";
// //import PostCard from "@/components/PostCard";

// export default async function Home() {
//   // const user = await currentUser();
//   // const posts = await getPosts();
//   // const dbUserId = await getDbUserId();
//   const user = await currentUser();
//   const posts = await getStartups();
//   const dbUserId = await getDbUserId();

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
//       <div className="lg:col-span-6">
//         {user ? <StartupForm /> : null}

//         {/* <div className="space-y-6">
//             {posts.map((post) => (
//               <PostCard key={post.id} post={post} dbUserId={dbUserId} />
//             ))}
//           </div>
//         </div>

//         <div className="hidden lg:block lg:col-span-4 sticky top-20">
//          */}
//         <div className="space-y-6">
//             {posts.map((post : StartupTypeCard) => (
//             <StartupCard key={post?._id} post={post} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // <WhoToFollow />



import { Suspense } from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import BlogCard from '@/components/BlogCard'
import { Plus } from 'lucide-react'
import { getBlogs } from '@/actions/blog.action'
import SearchForm from '@/components/SearchForm'



export default async function Home() {
  const user = await currentUser();
  const blogs = await getBlogs();
  const dbUserId = await getDbUserId();


  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">

        {user? 
        <><h1 className="text-4xl font-bold">Blog Posts</h1><Link
            href="/create-blog"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >


            <Plus className="w-5 h-5" />
            Create New Post
          </Link></>
 : null}
      </div>
      <div><SearchForm /></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense 
          fallback={[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="h-[400px] bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        >


{blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} dbUserId={dbUserId} />
          ))}
        </Suspense>
      </div>

      {blogs.length === 0 && (
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
  )
}

