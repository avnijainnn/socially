// //blog[id].tsx
// import { getBlogById } from "@/actions/blog.action";
// import Image from "next/image";
// import Link from "next/link";
// import { Eye } from "lucide-react";
// import type { Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string }
// }): Promise<Metadata> {
//   const blog = await getBlogById(params.id);
//   return {
//     title: blog?.title ?? 'Blog Post',
//     description: blog?.description ?? 'Blog post description',
//   };
// }

// export default async function BlogPost({ 
//   params
// }: {
//   params: { id: string }
// }) {
//   const blog = await getBlogById(params.id);

//   if (!blog) {
//     return <div>Blog not found</div>;
//   }

//   return (
//     <article className="max-w-3xl mx-auto p-6">
//       <div className="mb-6">
//         <div className="flex items-center justify-between">
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
//             {blog.category}
//           </span>
//           <div className="flex items-center text-gray-500">
//             <Eye className="w-5 h-5 mr-1" />
//             <span>{blog.views} views</span>
//           </div>
//         </div>
//       </div>

//       {blog.image && (
//         <div className="relative w-full h-64 mb-6">
//           <Image
//             src={blog.image}
//             alt={blog.title}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>
//       )}

//       <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

//       <div className="flex items-center mb-6">
//         {blog.author?.image && (
//           <Image
//             src={blog.author.image}
//             alt={blog.author.name || "Author"}
//             width={40}
//             height={40}
//             className="rounded-full mr-3"
//           />
//         )}

//         <div>
//           <Link href={`/profile/${blog.author.username}`} className="font-medium hover:underline">
//             {blog.author?.name}
//           </Link>
//           <div className="text-gray-500">
//           {new Date(blog.createdAt).toLocaleDateString("en-US", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// })}
//           </div>
//         </div>
//       </div>

//       <div className="prose max-w-none">
//         <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
//       </div>
//     </article>
//   );
// }


import { getBlogById } from "@/actions/blog.action";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";

type PageParams = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogById(resolvedParams.id);
  return {
    title: blog?.title ?? 'Blog Post',
    description: blog?.description ?? 'Blog post description',
  };
}

export default async function Page({ params }: PageParams) {
  const resolvedParams = await params;
  
  // Pre-fetch the blog data on the server
  const blog = await getBlogById(resolvedParams.id);
  
  if (!blog) {
    return <div>Blog not found</div>;
  }
  
  // Convert null values to undefined and Date to string before passing to BlogContent
  const processedBlog = {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
    image: blog.image || undefined,
    author: {
      ...blog.author,
      name: blog.author.name || undefined,
      website: blog.author.website || undefined,
      createdAt: blog.author.createdAt.toISOString(),
      updatedAt: blog.author.updatedAt.toISOString(),
      image: blog.author.image || undefined
    }
  };
  return <BlogContent blog={processedBlog} />;
}