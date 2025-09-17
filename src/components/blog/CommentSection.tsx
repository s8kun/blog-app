import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Comment, User } from "../../../types";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

interface CommentSectionProps {
  comments: Comment[];
  currentUser: User | null;
  onAddComment: (commentText: string) => void;
  onNavigate: (route: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  currentUser,
  onAddComment,
  onNavigate,
}) => {
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-on-surface">
        Comments ({comments.length})
      </h2>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="mb-2"
          />
          <Button type="submit" disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </form>
      ) : (
        <div className="mb-8 p-4 text-center bg-background rounded-lg border border-gray-700">
          <p className="text-gray-400">
            <span
              onClick={() => navigate("/login")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Login
            </span>{" "}
            or{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Sign up
            </span>{" "}
            to add a comment.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <img
              src={comment.author.avatarUrl}
              alt={comment.author.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 bg-background p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-primary">
                  {comment.author.username}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="text-on-background">{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
