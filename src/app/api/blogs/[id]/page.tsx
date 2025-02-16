import { getBlogs, toggleView } from "@/actions/blog.action";
import { SignInButton, useUser } from "@clerk/nextjs";
//import { useState } from "react";
import toast from "react-hot-toast";
//import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
//import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
//import { DeleteAlertDialog } from "./DeleteAlertDialog";
//import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon } from "lucide-react";
//import { Textarea } from "./ui/textarea";

type Blogs = Awaited<ReturnType<typeof getBlogs>>;
type Blog = Blogs[number];
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye } from 'lucide-react'
console.log("blofffffffffffffffffff")


export default function BlogPost({ blog, dbUserId }: { blog: Blog; dbUserId: string | null }) {
  const { user } = useUser();
  //const [isLiking, setIsLiking] = useState(false);
  const [views, setViews] = useState(blog.views);

  // useEffect(() => {
  //   if (!id) return

  //   const fetchBlog = async () => {
  //     try {
  //       const response = await fetch(`/api/blogs/${id}`)
  //       const data = await response.json()
  //       setBlog(data)
  //       // Increment view count
  //       await fetch(`/api/blogs/${id}/view`, { method: 'POST' })
  //     } catch (error) {
  //       console.error('Error:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchBlog()
  // }, [id])

  // if (isLoading) return <div>Loading...</div>
  // if (!blog) return <div>Blog not found</div>

  return (
    <article className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
            {blog.category}
          </span>
          <div className="flex items-center text-gray-500">
            <Eye className="w-5 h-5 mr-1" />
            <span>{blog.views} views</span>
          </div>
        </div>
      </div>

      {blog.image && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      
      <div className="flex items-center mb-6">
        {blog.author.image && (
          <Image
            src={blog.author.image}
            alt={blog.author.name || 'Author'}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
        )}
        <div>
          <div className="font-medium">{blog.author.name}</div>
          <div className="text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
        {/* <div className="whitespace-pre-wrap">{blog.content}</div> */}
      </div>
    </article>
  )
}