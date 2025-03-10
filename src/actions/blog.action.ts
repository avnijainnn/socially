"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createBlog(title: string, description: string ,category: string, image: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const blog = await prisma.blog.create({
      data: {
        title, 
        description,
        category, // Add a default category or modify as needed
        image,
        authorId: userId,
      },
    });

    revalidatePath("/"); // purge the cache for the home page
    return { success: true, blog };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}


export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error in getBlogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export async function toggleView(blogId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/`); // Refresh the blog page
    return { success: true };
  } catch (error) {
    console.error("Error updating views:", error);
    return { success: false, error: "Error updating views" };
  }
}

export async function getBlogById(id: string) {
  try {
    return await prisma.blog.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

