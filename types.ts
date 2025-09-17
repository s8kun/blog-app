export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  password?: string; // For mock purposes, not for production
}

export interface Comment {
  id: number;
  text: string;
  author: User;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  usersWhoLiked?: number[];
  comments: Comment[];
  tags: string[];
  imageUrl?: string;
}

export type View =
  | "home"
  | "postDetail"
  | "createPost"
  | "login"
  | "signup"
  | "profile";
