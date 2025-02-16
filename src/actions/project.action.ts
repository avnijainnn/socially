"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function createProject(title: string, description: string, github: string, live: string, collaboration: boolean) {
  try {
    const userId = await getDbUserId();

    if (!userId) return { success: false, error: "User not authenticated" };

    const blog = await prisma.project.create({
      data: {
        title,
        description,
        github,     // Optional unless collaboration is true
        live,     
        collaboration,
        

      },
    });

    revalidatePath("/projects"); // Refresh the main page
    return { success: true, blog };
  } catch (error) {
    console.error("Failed to create blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function getProjects() {
    try {
      const blogs = await prisma.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          live: true,
          github: true,
          collaboration: true,
          createdAt: true,
        },
      });
  
      return blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Failed to fetch blogs");
    }
  }
  
  export async function deleteProject(projectId: string) {
    
    try {
      await prisma.project.delete({
        where: { id: projectId },
      });
      return { message: "Project deleted successfully" };
    } catch (error) {
      console.log("Error in deleteProject", error);
      throw new Error("Failed to delete project");
    }
  }
  
  export async function editProject(projectId: string, data: { title?: string; description?: string; github?: string; live?: string; collaboration?: boolean; }) {
    try {
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data,
      });
      return updatedProject;
    } catch (error) {
      console.log("Error in editProject", error);
      throw new Error("Failed to edit project");
    }
  }
