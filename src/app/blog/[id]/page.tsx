//"use client";
import { getBlogs, toggleView } from "@/actions/blog.action";
import { useParams } from "next/navigation"; // Use this for dynamic route params
import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { revalidatePath } from "next/cache";
//import { useRouter } from "next/router";

type Blogs = Awaited<ReturnType<typeof getBlogs>>;
type Blog = Blogs[number];

export default async function BlogPost({ params }: { params: { id: string } }) {
//     // Fetch blog data on the server
//     const { id } = params;

//   // Fetch blog data from the database
//   const blog = await getBlogById(id);

//     if (!blog) {
//       return <p>Blog not found.</p>;
//     }
try {
    const { id } = params;

    // Fetch blog data from the database
    const blog = await getBlogById(id);


    if (!blog) {
      return <div>Blog not found</div>;
    }
    toggleView(blog.id);
    //revalidatePath('/')
    //refreshRouter();

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
          {blog.author?.image && (
            <Image
              src={blog.author.image}
              alt={blog.author.name || "Author"}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
          )}
          <div>
            <div className="font-medium">{blog.author?.name}</div>
            <div className="text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
  
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
        </div>
      </article>
      
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return <div>Failed to load blog. Please try again later.</div>;
  }
}

//   // Fetch the blog details
// //   useEffect(() => {
// //     if (!id) return;

// //     const fetchBlog = async () => {
// //       try {
// //         const response = await fetch(`/api/blog/${id}`);
// //         const data = await response.json();
// //         setBlog(data);
// //         setViews(data.views || 0);
// //       } catch (error) {
// //         console.error("Error fetching blog:", error);
// //       }
// //     };

// //     fetchBlog();
// //   }, [id]);

//   // Increment the blog's view count when the page loads
// //   useEffect(() => {
// //     if (!id) return;

// //     const incrementViews = async () => {
// //       try {
// //         const response = await fetch(`/api/blog/${id}/increment-views`, {
// //           method: "POST",
// //         });
// //         const data = await response.json();
// //         setViews(data.updatedViews || views);
// //       } catch (error) {
// //         console.error("Error incrementing views:", error);
// //       }
// //     };

// //     incrementViews();
// //   }, [id]);

//   if (!blog) return <p>Loading...</p>;
//   toggleView(blog.id); // Increment the view count

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
//           <div className="font-medium">{blog.author?.name}</div>
//           <div className="text-gray-500">
//             {new Date(blog.createdAt).toLocaleDateString()}
//           </div>
//         </div>
//       </div>

//       <div className="prose max-w-none">
//         <p className="text-xl text-gray-600 mb-8">{blog.description}</p>
//       </div>
//     </article>
//   );
// }
async function getBlogById(id: string): Promise<Blog | null> {
    const blogs = await getBlogs();
    return blogs.find(blog => blog.id === id) || null;
}
// function refreshRouter() {
//     const router = useRouter();
//     router.replace(router.asPath);
// }

