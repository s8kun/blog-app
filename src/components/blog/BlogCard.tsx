import React, { useMemo, useCallback } from "react";
import { Link } from "react-router";
import { Post, User } from "../../../types";
import Card from "../ui/Card";

const CONTENT_TRUNCATE_LENGTH = 100;

interface BlogCardProps {
  post: Post;
  onSelectPost: (post: Post) => void;
  onSelectUser: (user: User) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onSelectPost,
  onSelectUser,
}) => {
  const formattedDate = useMemo(
    () => new Date(post.createdAt).toLocaleDateString(),
    [post.createdAt]
  );

  const truncatedContent = useMemo(
    () =>
      post.content.length > CONTENT_TRUNCATE_LENGTH
        ? `${post.content.substring(0, CONTENT_TRUNCATE_LENGTH)}...`
        : post.content,
    [post.content]
  );

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = `https://picsum.photos/seed/fallback-${post.id}/800/400`;
    },
    []
  );

  const handleAvatarError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = `https://ui-avatars.com/api/?name=${post.author.username}&background=6366f1&color=fff`;
    },
    [post.author.username]
  );

  const handlePostClick = useCallback(
    () => onSelectPost(post),
    [onSelectPost, post]
  );
  const handleUserClick = useCallback(
    () => onSelectUser(post.author),
    [onSelectUser, post.author]
  );

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <Link to={`/post/${post.id}`} onClick={handlePostClick}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover rounded-t-md"
            onError={handleImageError}
          />
        </Link>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link
            to={`/post/${post.id}`}
            className="text-on-surface hover:text-primary transition-colors"
            onClick={handlePostClick}
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-400 mb-4">{truncatedContent}</p>
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${post.author.id}`}
            className="flex items-center space-x-2 hover:text-primary transition-colors"
            onClick={handleUserClick}
          >
            <img
              src={post.author.avatarUrl}
              alt={post.author.username}
              className="w-8 h-8 rounded-full"
              onError={handleAvatarError}
            />
            <span className="text-sm font-medium">{post.author.username}</span>
          </Link>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-400">{post.likes} likes</span>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
