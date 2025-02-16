// "use server";

// import prisma from "@/lib/prisma";
// import { getDbUserId } from "./user.action";
// import { revalidatePath } from "next/cache";

// export async function createAdvice(content: string, image: string) {
//   try {
//     const userId = await getDbUserId();

//     if (!userId) return;

//     const advice = await prisma.advice.create({
//       data: {
//         content,
//         image,
//         authorId: userId,
//       },
//     });

//     revalidatePath("/"); // purge the cache for the home page
//     return { success: true, advice };
//   } catch (error) {
//     console.error("Failed to create post:", error);
//     return { success: false, error: "Failed to create post" };
//   }
// }

// export async function getAdvices() {
//   try {
//     const posts = await prisma.advice.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//             username: true,
//           },
//         },
//         replies: {
//           include: {
//             author: {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true,
//                 name: true,
//               },
//             },
//           },
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//         reputations: {
//           select: {
//             userId: true,
//           },
//         },
//         _count: {
//           select: {
//             reputations: true,
//             replies: true,
//           },
//         },
//       },
//     });

//     return posts;
//   } catch (error) {
//     console.log("Error in getPosts", error);
//     throw new Error("Failed to fetch posts");
//   }
// }

// export async function toggleReputation(postId: string) {
//   try {
//     const userId = await getDbUserId();
//     if (!userId) return;

//     // check if like exists
//     const existingReputation = await prisma.reputation.findUnique({
//       where: {
//         userId_adviceId: {
//           userId,
//           adviceId,
//         },
//       },
//     });

//     const post = await prisma.post.findUnique({
//       where: { id: adviceId },
//       select: { authorId: true },
//     });

//     if (!post) throw new Error("Post not found");

//     if (existingReputation) {
//       // unlike
//       await prisma.like.delete({
//         where: {
//           userId_adviceId: {
//             userId,
//             adviceId,
//           },
//         },
//       });
//     } else {
//       // like and create notification (only if liking someone else's post)
//       await prisma.$transaction([
//         prisma.advice.create({
//           data: {
//             userId,
//             adviceId,
//           },
//         }),
//         ...(post.authorId !== userId
//           ? [
//               prisma.notification.create({
//                 data: {
//                   type: "LIKE",
//                   userId: post.authorId, // recipient (post author)
//                   creatorId: userId, // person who liked
//                   postId,
//                 },
//               }),
//             ]
//           : []),
//       ]);
//     }

//     revalidatePath("/");
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to toggle like:", error);
//     return { success: false, error: "Failed to toggle like" };
//   }
// }

// export async function createComment(postId: string, content: string) {
//   try {
//     const userId = await getDbUserId();

//     if (!userId) return;
//     if (!content) throw new Error("Content is required");

//     const post = await prisma.post.findUnique({
//       where: { id: postId },
//       select: { authorId: true },
//     });

//     if (!post) throw new Error("Post not found");

//     // Create comment and notification in a transaction
//     const [comment] = await prisma.$transaction(async (tx) => {
//       // Create comment first
//       const newComment = await tx.comment.create({
//         data: {
//           content,
//           authorId: userId,
//           postId,
//         },
//       });

//       // Create notification if commenting on someone else's post
//       if (post.authorId !== userId) {
//         await tx.notification.create({
//           data: {
//             type: "COMMENT",
//             userId: post.authorId,
//             creatorId: userId,
//             postId,
//             commentId: newComment.id,
//           },
//         });
//       }

//       return [newComment];
//     });

//     revalidatePath(`/`);
//     return { success: true, comment };
//   } catch (error) {
//     console.error("Failed to create comment:", error);
//     return { success: false, error: "Failed to create comment" };
//   }
// }

// export async function deletePost(postId: string) {
//   try {
//     const userId = await getDbUserId();

//     const post = await prisma.post.findUnique({
//       where: { id: postId },
//       select: { authorId: true },
//     });

//     if (!post) throw new Error("Post not found");
//     if (post.authorId !== userId) throw new Error("Unauthorized - no delete permission");

//     await prisma.post.delete({
//       where: { id: postId },
//     });

//     revalidatePath("/"); // purge the cache
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to delete post:", error);
//     return { success: false, error: "Failed to delete post" };
//   }
// }

"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

// Create Advice
export async function createAdvice(content: string, image: string, tags: string[]) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const advice = await prisma.advice.create({
      data: {
        content,
        image,
        tags, // Include tags array
        authorId: userId,
      },
    });

    revalidatePath("/advice"); // Purge the cache for the home page
    return { success: true, advice };
  } catch (error) {
    console.error("Failed to create advice:", error);
    return { success: false, error: "Failed to create advice" };
  }
}

// Get All Advices
// export async function getAdvices() {
//   try {
//     const advices = await prisma.advice.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         author: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//             username: true,
//           },
//         },
//         replies: {
//           include: {
//             author: {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true,
//                 name: true,
//               },
//             },
//           },
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//         reputations: {
//           select: {
//             userId: true,
//           },
//         },
//         _count: {
//           select: {
//             reputations: true,
//             replies: true,
//           },
//         },
//       },
//     });

//     return advices;
//   } catch (error) {
//     console.log("Error in getAdvices", error);
//     throw new Error("Failed to fetch advices");
//   }
// }


export async function getAdvices() {
  try {
    const advices = await prisma.advice.findMany({
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
        replies: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        reputations: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            reputations: true,
            replies: true,
          },
        },
      },
      
    });

    // Filter out null tags or empty tag arrays from the response
    

    return advices;
  } catch (error) {
    console.log("Error in getAdvices", error);
    throw new Error("Failed to fetch advices");
  }
}

// Toggle Reputation (Similar to Like)
// export async function toggleReputation(adviceId: string) {
//   try {
//     const userId = await getDbUserId();
//     if (!userId) return;

//     // Check if reputation exists
//     const existingReputation = await prisma.reputation.findUnique({
//       where: {
//         userId_adviceId: {
//           userId,
//           adviceId,
//         },
//       },
//     });

//     const advice = await prisma.advice.findUnique({
//       where: { id: adviceId },
//       select: { authorId: true },
//     });

//     if (!advice) throw new Error("Advice not found");

//     if (existingReputation) {
//       // Remove reputation
//       await prisma.reputation.delete({
//         where: {
//           userId_adviceId: {
//             userId,
//             adviceId,
//           },
//         },
//       });
//     } else {
//       // Add reputation and create notification (only if reputing someone else's advice)
//       await prisma.$transaction([
//         prisma.reputation.create({
//           data: {
//             userId,
//             adviceId,
//           },
//         }),
//         ...(advice.authorId !== userId
//           ? [
//               prisma.notification.create({
//                 data: {
//                   type: "REPUTATION", // You can create a new type for reputation if needed
//                   userId: advice.authorId, // Recipient (advice author)
//                   creatorId: userId, // Person who gave reputation
//                   adviceId,
//                 },
//               }),
//             ]
//           : []),
//       ]);
//     }

//     revalidatePath("/advice");
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to toggle reputation:", error);
//     return { success: false, error: "Failed to toggle reputation" };
//   }
// }
export async function toggleReputation(adviceId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    // Check if reputation exists
    const existingReputation = await prisma.reputation.findUnique({
      where: {
        userId_adviceId: {
          userId,
          adviceId,
        },
      },
    });

    const advice = await prisma.advice.findUnique({
      where: { id: adviceId },
      select: { authorId: true },
    });

    if (!advice) {
      return { success: false, error: "Advice not found" };
    }

    if (existingReputation) {
      // Remove reputation
      await prisma.reputation.delete({
        where: {
          userId_adviceId: {
            userId,
            adviceId,
          },
        },
      });
    } else {
      // Add reputation
      await prisma.reputation.create({
        data: {
          userId,
          adviceId,
        },
      });

      // Only create notification if giving reputation to someone else's advice
      if (advice.authorId !== userId) {
        await prisma.notification.create({
          data: {
            type: "REPUTATION",
            userId: advice.authorId,
            creatorId: userId,
            adviceId,
          },
        });
      }
    }

    // Make sure to revalidate both paths
    revalidatePath("/advice");
    revalidatePath(`/advice/${adviceId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle reputation:", error);
    return { success: false, error: "Failed to toggle reputation" };
  }
}
// Create Reply to Advice
export async function createReply(adviceId: string, content: string) {
  try {
    const userId = await getDbUserId();

    if (!userId) return;
    if (!content) throw new Error("Content is required");

    const advice = await prisma.advice.findUnique({
      where: { id: adviceId },
      select: { authorId: true },
    });

    if (!advice) throw new Error("Advice not found");

    // Create reply and notification in a transaction
    const [reply] = await prisma.$transaction(async (tx) => {
      // Create reply first
      const newReply = await tx.reply.create({
        data: {
          content,
          authorId: userId,
          adviceId,
        },
      });

      // Create notification if replying to someone else's advice
      if (advice.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "REPLY", // You can create a new type for replies if needed
            userId: advice.authorId,
            creatorId: userId,
            adviceId,
            replyId: newReply.id,
          },
        });
      }

      return [newReply];
    });

    revalidatePath(`/`);
    return { success: true, reply };
  } catch (error) {
    console.error("Failed to create reply:", error);
    return { success: false, error: "Failed to create reply" };
  }
}

// Delete Advice
export async function deleteAdvice(adviceId: string) {
  try {
    const userId = await getDbUserId();

    const advice = await prisma.advice.findUnique({
      where: { id: adviceId },
      select: { authorId: true },
    });

    if (!advice) throw new Error("Advice not found");
    if (advice.authorId !== userId) throw new Error("Unauthorized - no delete permission");

    await prisma.advice.delete({
      where: { id: adviceId },
    });

    revalidatePath("/"); // Purge the cache
    return { success: true };
  } catch (error) {
    console.error("Failed to delete advice:", error);
    return { success: false, error: "Failed to delete advice" };
  }
}