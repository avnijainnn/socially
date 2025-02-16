"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SendIcon, ReplyIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createAdvice, createReply, toggleReputation } from "@/actions/advice.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

function CreateAdvice({ adviceId, isReply = false, onReplySubmit }: { adviceId?: string; isReply?: boolean; onReplySubmit?: () => void }) {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]); // State for tags
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      if (isReply && adviceId) {
        // Handle reply submission
        const result = await createReply(adviceId, content);
        if (result?.success) {
          setContent("");
          setImageUrl("");
          setShowImageUpload(false);
          toast.success("Reply posted successfully");
          if (onReplySubmit) onReplySubmit(); // Trigger callback to refresh replies
        }
      } else {
        // Handle advice submission
        const result = await createAdvice(content, imageUrl, tags); // Include tags
        if (result?.success) {
          setContent("");
          setImageUrl("");
          setTags([]); // Reset tags
          setShowImageUpload(false);
          toast.success("Advice created successfully");
        }
      }
    } catch (error) {
      console.error("Failed to create:", error);
      toast.error("Failed to create");
    } finally {
      setIsPosting(false);
    }
  };

  const handleToggleReputation = async () => {
    if (!adviceId) return;

    setIsPosting(true);
    try {
      const result = await toggleReputation(adviceId);
      if (result?.success) {
        toast.success("Reputation toggled successfully");
      }
    } catch (error) {
      console.error("Failed to toggle reputation:", error);
      toast.error("Failed to toggle reputation");
    } finally {
      setIsPosting(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar>
            <Textarea
              placeholder={isReply ? "Write a reply..." : "Share your advice..."}
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {/* Tags Input (only for creating advice, not replies) */}
          {!isReply && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Add a tag (e.g., 'coding')"
                className="w-full p-2 border rounded-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleAddTag(e.currentTarget.value);
                    e.currentTarget.value = ""; // Clear input after adding tag
                  }
                }}
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload */}
          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url || "");
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              {!isReply && (
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
              )}
              {adviceId && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  onClick={handleToggleReputation}
                  disabled={isPosting}
                >
                  <ThumbsUpIcon className="size-4 mr-2" />
                  Reputation
                </Button>
              )}
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  {isReply ? "Replying..." : "Posting..."}
                </>
              ) : (
                <>
                  {isReply ? <ReplyIcon className="size-4 mr-2" /> : <SendIcon className="size-4 mr-2" />}
                  {isReply ? "Reply" : "Post"}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateAdvice;