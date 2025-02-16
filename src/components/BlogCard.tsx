"use client";
import Image from 'next/image'
// import Link from 'next/link'
import { Eye } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface BlogCardProps {
//   blog: {
//     id: string
//     title: string
//     description: string
//     category: string
//     image: string | null
//     views: number
//     author: {
//       name: string | null 
//       image?: string 
//     }
//     createdAt: Date
//   }
// }

// export default function BlogCard({ blog }: BlogCardProps) {
//   return (
//     <Link href={`/blog/${blog.id}`}>
//       <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//         {blog.image && (
//           <div className="relative w-full h-48">
//             <Image
//               src={blog.image}
//               alt={blog.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         )}
//         <CardHeader>
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
//               {blog.category}
//             </span>
//             <div className="flex items-center text-gray-500">
//               <Eye className="w-4 h-4 mr-1" />
//               <span>{blog.views}</span>
//             </div>
//           </div>
//           <CardTitle className="text-xl font-bold">{blog.title}</CardTitle>
//           <div className="flex items-center mt-2">
//             {blog.author.image && (
//               <Image
//                 src={blog.author.image}
//                 alt={blog.author.name || 'Author'}
//                 width={24}
//                 height={24}
//                 className="rounded-full mr-2"
//               />
//             )}
//             <span className="text-sm text-gray-500">
//               By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-600 line-clamp-3">{blog.description}</p>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }


import { getBlogs, toggleView } from "@/actions/blog.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
//import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

type Blogs = Awaited<ReturnType<typeof getBlogs>>;
type Blog = Blogs[number];



function BlogCard({ blog, dbUserId }: { blog: Blog; dbUserId: string | null }) {
  const { user } = useUser();
  //const [isLiking, setIsLiking] = useState(false);
  const [views, setViews] = useState(blog.views);



  return (
    <Link href={`/blog/${blog.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {blog.image && (
          <div className="relative w-full h-48">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {blog.category}
            </span>
            <div className="flex items-center text-gray-500">
              <Eye className="w-4 h-4 mr-1" />
              <span>{blog.views}</span>
            </div>
          </div>
          <CardTitle className="text-xl font-bold">{blog.title}</CardTitle>
          <div className="flex items-center mt-2">
            {blog.author.image && (
              <Image
                src={blog.author.image}
                alt={blog.author.name || 'Author'}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-500">
              By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 line-clamp-3">{blog.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
export default BlogCard;
