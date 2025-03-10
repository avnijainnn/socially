"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Year } from "@prisma/client";
import { broadcastNotification } from "@/server/websocketServer";

export async function createInternship(
    title: string, 
    company: string, 
    description: string, 
    eligibleYears: string[], // ✅ Moved before optional params
    location: string, 
    salary?: number, 
    applyUrl?: string, 
    startDate?: Date, 
    endDate?: Date
  ) 
   {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const internship = await prisma.internship.create({
        data: {
          title,
          company,
          description,
          location,
          salary,
          applyUrl,
          startDate,
          endDate,
          userId,
          eligibleYears: {
            create: eligibleYears.map((year) => ({ year: year as Year })), // Ensure type matches
          },
        },
      });

    revalidatePath("/"); // purge the cache for the home page

    // Broadcast notification to all users except the one who posted
    const years = eligibleYears.join(", ");
    broadcastNotification(userId, `A new internship posted for ${years} year(s)`);

    return { success: true, internship };
  } catch (error) {
    console.error("Failed to create internship:", error);
    return { success: false, error: "Failed to create internship" };
  }
}

export async function getInternships() {
  try {
    const internships = await prisma.internship.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        eligibleYears: true,
      },
    });

    return internships;
  } catch (error) {
    console.error("Error in getInternships:", error);
    throw new Error("Failed to fetch internships");
  }
}

export async function getInternshipById(id: string) {
  try {
    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        eligibleYears: true,
      },
    });

    return internship;
  } catch (error) {
    console.error("Error fetching internship:", error);
    return null;
  }
}
