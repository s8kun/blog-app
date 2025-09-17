import React, { useCallback } from "react";
import { Post, User } from "../../../types";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onSelectUser: (user: User) => void;
}

const BlogList: React.FC<BlogListProps> = ({
  posts,
  onSelectPost,
  onSelectUser,
}) => {
  const handleSelectPost = useCallback(
    (post: Post) => {
      onSelectPost(post);
    },
    [onSelectPost]
  );

  const handleSelectUser = useCallback(
    (user: User) => {
      onSelectUser(user);
    },
    [onSelectUser]
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          onSelectPost={handleSelectPost}
          onSelectUser={handleSelectUser}
        />
      ))}
    </div>
  );
};

export default BlogList;
