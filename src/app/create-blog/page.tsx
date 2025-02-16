// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Textarea } from "@/components/ui/textarea";
// import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { createBlog } from "@/actions/blog.action";
// import toast from "react-hot-toast";
// import ImageUpload from "@/components/ImageUpload";

// function CreateBlog() {
//   const { user } = useUser();
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [isPosting, setIsPosting] = useState(false);
//   const [showImageUpload, setShowImageUpload] = useState(false);

//   const handleSubmit = async () => {
//     if (!title.trim() || !description.trim() || !category.trim()) return;

//     setIsPosting(true);
//     try {
//       const result = await createBlog(title,description, category, imageUrl);
//       if (result?.success) {
//         setTitle("");
//         setDescription("");
//         setCategory("");
//         setImageUrl("");
//         setShowImageUpload(false);

//         toast.success("Blog created successfully");
//       }
//     } catch (error) {
//       console.error("Failed to create blog:", error);
//       toast.error("Failed to create blog");
//     } finally {
//       setIsPosting(false);
//     }
//   };

//   return (
//     <Card className="mb-6">
//       <CardContent className="pt-6">
//         <div className="space-y-4">
//           <div className="flex space-x-4">
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={user?.imageUrl || "/avatar.png"} />
//             </Avatar>
//             <div className="flex flex-col w-full space-y-2">
//               <input
//                 type="text"
//                 placeholder="Enter blog title"
//                 className="border rounded-lg p-2 w-full text-base"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 disabled={isPosting}
//               />
//               <Textarea
//                 placeholder="Write your blog content here..."
//                 className="min-h-[150px] resize-none border-none focus-visible:ring-0 p-0 text-base"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 disabled={isPosting}
//               />
//               <Textarea
//                 placeholder="Write your blog content here..."
//                 className="min-h-[150px] resize-none border-none focus-visible:ring-0 p-0 text-base"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 disabled={isPosting}
//               />
//             </div>
//           </div>

//           {(showImageUpload || imageUrl) && (
//             <div className="border rounded-lg p-4">
//               <ImageUpload
//                 endpoint="postImage"
//                 value={imageUrl}
//                 onChange={(url) => {
//                   setImageUrl(url);
//                   if (!url) setShowImageUpload(false);
//                 }}
//               />
//             </div>
//           )}

//           <div className="flex items-center justify-between border-t pt-4">
//             <div className="flex space-x-2">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="text-muted-foreground hover:text-primary"
//                 onClick={() => setShowImageUpload(!showImageUpload)}
//                 disabled={isPosting}
//               >
//                 <ImageIcon className="size-4 mr-2" />
//                 Photo
//               </Button>
//             </div>
//             <Button
//               className="flex items-center"
//               onClick={handleSubmit}
//               disabled={(!title.trim() || !description.trim()) || !category.trim() || isPosting}
//             >
//               {isPosting ? (
//                 <>
//                   <Loader2Icon className="size-4 mr-2 animate-spin" />
//                   Posting...
//                 </>
//               ) : (
//                 <>
//                   <SendIcon className="size-4 mr-2" />
//                   Post
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
// export default CreateBlog;

"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBlog } from "@/actions/blog.action";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";

function CreateBlog() {
  const { user } = useUser();
  const router = useRouter(); // Initialize useRouter
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !category.trim()) return;

    setIsPosting(true);
    try {
      const result = await createBlog(title, description, category, imageUrl);
      if (result?.success) {
        setTitle("");
        setDescription("");
        setCategory("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Blog created successfully");

        // Redirect to the main page
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
      toast.error("Failed to create blog");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar>
            <div className="flex flex-col w-full space-y-2">
              <input
                type="text"
                placeholder="Enter blog title"
                className="border rounded-lg p-2 w-full text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isPosting}
              />
              <Textarea
                placeholder="Enter blog category"
                className="min-h-[50px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isPosting}
              />
              <Textarea
                placeholder="Write your blog content here..."
                className="min-h-[150px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPosting}
              />
            </div>
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || !category.trim() || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default CreateBlog;
