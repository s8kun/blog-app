import React from "react";
import { Post, User } from "../../../types";
import BlogCard from "../blog/BlogCard";
import Card from "../ui/Card";
import { Mail } from "lucide-react";

interface ProfilePageProps {
  user: User;
  userPosts: Post[];
  onSelectPost: (post: Post) => void;
  // FIX: Added onSelectUser to props to pass it down to BlogCard.
  onSelectUser: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  userPosts,
  onSelectPost,
  onSelectUser,
}) => {
  return (
    <div className="space-y-8">
      <Card className="p-4 sm:p-8 flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8">
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="w-32 h-32 rounded-full ring-4 ring-primary flex-shrink-0"
        />
        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-on-surface">
            {user.fullName}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mt-1">
            @{user.username}
          </p>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-400 mt-4">
            <Mail className="w-5 h-5" />
            <span>{user.email}</span>
          </div>
          <p className="text-lg text-secondary mt-4 font-semibold">
            {userPosts.length} posts written
          </p>
        </div>
      </Card>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-on-background">
          Your Posts
        </h2>
        {userPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {userPosts.map((post) => (
              // FIX: Pass the onSelectUser prop to BlogCard to satisfy its required props.
              <BlogCard
                key={post.id}
                post={post}
                onSelectPost={() => onSelectPost(post)}
                onSelectUser={onSelectUser}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center text-gray-400 p-8">
            <h3 className="text-xl font-semibold">No Posts Yet</h3>
            <p className="mt-2">Time to write your first masterpiece!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
