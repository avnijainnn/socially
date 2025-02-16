"use client";

import { createReply, deleteAdvice, getAdvices, toggleReputation } from "@/actions/advice.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon, ThumbsUpIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

type Advices = Awaited<ReturnType<typeof getAdvices>>;
type Advice = Advices[number];

function AdviceCard({ advice, dbUserId }: { advice: Advice; dbUserId: string | null }) {
  const { user } = useUser();
  const [newReply, setNewReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isReputationing, setIsReputationing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasReputation, setHasReputation] = useState(
    advice.reputations.some((reputation) => reputation.userId === dbUserId)
  );
  const [optimisticReputations, setOptimisticReputations] = useState(advice._count.reputations);
  const [showReplies, setShowReplies] = useState(false);

  const handleReputation = async () => {
    if (isReputationing) return;
    try {
      setIsReputationing(true);
      setHasReputation((prev) => !prev);
      setOptimisticReputations((prev) => prev + (hasReputation ? -1 : 1));
      await toggleReputation(advice.id);
    } catch (error) {
      setOptimisticReputations(advice._count.reputations);
      setHasReputation(advice.reputations.some((reputation) => reputation.userId === dbUserId));
    } finally {
      setIsReputationing(false);
    }
  };

  const handleAddReply = async () => {
    if (!newReply.trim() || isReplying) return;
    try {
      setIsReplying(true);
      const result = await createReply(advice.id, newReply);
      if (result?.success) {
        toast.success("Reply posted successfully");
        setNewReply("");
      }
    } catch (error) {
      toast.error("Failed to add reply");
    } finally {
      setIsReplying(false);
    }
  };

  const handleDeleteAdvice = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deleteAdvice(advice.id);
      if (result.success) toast.success("Advice deleted successfully");
      else throw new Error(result.error);
    } catch (error) {
      toast.error("Failed to delete advice");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${advice.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={advice.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* ADVICE HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${advice.author.username}`}
                    className="font-semibold truncate"
                  >
                    {advice.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href={`/profile/${advice.author.username}`}>@{advice.author.username}</Link>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(advice.createdAt))} ago</span>
                  </div>
                </div>
                {/* Check if current user is the advice author */}
                {dbUserId === advice.author.id && (
                  <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDeleteAdvice} />
                )}
              </div>
              <p className="mt-2 text-sm text-foreground break-words">{advice.content}</p>
            </div>
          </div>

          {/* ADVICE IMAGE */}
          {advice.image && (
            <div className="rounded-lg overflow-hidden">
              <img src={advice.image} alt="Advice content" className="w-full h-auto object-cover" />
            </div>
          )}

          {/* TAGS */}
          {advice.tags && advice.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {advice.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted/50 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* REPUTATION & REPLY BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasReputation ? "text-green-500 hover:text-green-600" : "hover:text-green-500"
                }`}
                onClick={handleReputation}
              >
                {hasReputation ? (
                  <ThumbsUpIcon className="size-5 fill-current" />
                ) : (
                  <ThumbsUpIcon className="size-5" />
                )}
                <span>{optimisticReputations}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                  <ThumbsUpIcon className="size-5" />
                  <span>{optimisticReputations}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowReplies((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${showReplies ? "fill-blue-500 text-blue-500" : ""}`}
              />
              <span>{advice.replies.length}</span>
            </Button>
          </div>

          {/* REPLIES SECTION */}
          {showReplies && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY REPLIES */}
                {advice.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarImage src={reply.author.image ?? "/avatar.png"} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-sm">{reply.author.name}</span>
                        <span className="text-sm text-muted-foreground">
                          @{reply.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(reply.createdAt))} ago
                        </span>
                      </div>
                      <p className="text-sm break-words">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a reply..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddReply}
                        className="flex items-center gap-2"
                        disabled={!newReply.trim() || isReplying}
                      >
                        {isReplying ? (
                          "Posting..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Reply
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Sign in to reply
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AdviceCard;