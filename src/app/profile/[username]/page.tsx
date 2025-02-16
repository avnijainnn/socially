import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  getUserAdvices,
  getUserBlogs,
  //isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  // isCurrentUserFollowing

  const [posts, likedPosts, advices, blogs] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    getUserAdvices(user.id),
    getUserBlogs(user.id),
    //isFollowing(user.id),
  ]);
  

  return (
    <ProfilePageClient
      user={user}
      likedPosts={likedPosts}
      posts={posts}
      advices={advices}
      blogs={blogs}
      
    
      //isFollowing={isCurrentUserFollowing}
    />
  );
}
export default ProfilePageServer;
