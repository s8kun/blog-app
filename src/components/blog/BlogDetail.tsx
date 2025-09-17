import React from "react";
import { useNavigate } from "react-router";
import { Post, User } from "../../../types";
import CommentSection from "./CommentSection";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Heart, Edit2, Trash2 } from "lucide-react";

interface BlogDetailProps {
  post: Post;
  currentUser: User | null;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  onNavigate: (route: string) => void;
  onSelectUser: (user: User) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({
  post,
  currentUser,
  onLike,
  onAddComment,
  onEdit,
  onDelete,
  onNavigate,
  onSelectUser,
}) => {
  const navigate = useNavigate();
  const isAuthor = currentUser?.id === post.author.id;

  const hasLiked = currentUser
    ? post.usersWhoLiked?.includes(currentUser.id)
    : false;

  const handleLikeClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    onLike(post.id);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-md"
        />
      )}

      <div className="p-6 sm:p-8 md:p-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-gray-400">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onSelectUser(post.author)}
          >
            <img
              src={post.author.avatarUrl}
              alt={post.author.username}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{post.author.username}</span>
          </div>
          <span className="hidden sm:inline">&bull;</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-on-background leading-relaxed">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            onClick={handleLikeClick}
            variant="ghost"
            className={`flex items-center space-x-2 ${
              hasLiked ? "text-red-500" : "text-gray-700 hover:text-red-400"
            }`}
            aria-label={
              currentUser ? "Like this post" : "Login to like this post"
            }
          >
            <Heart className="w-6 h-6" />
            <span className="text-lg font-bold">{post.likes}</span>
          </Button>

          {isAuthor && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => onEdit(post)}
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <Edit2 className="w-5 h-5" />
                <span>Edit</span>
              </Button>
              <Button
                onClick={() => onDelete(post.id)}
                variant="danger"
                className="flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </Button>
            </div>
          )}
        </div>

        <CommentSection
          comments={post.comments}
          onAddComment={(text) => onAddComment(post.id, text)}
          currentUser={currentUser}
          onNavigate={onNavigate}
        />
      </div>
    </Card>
  );
};

export default BlogDetail;
