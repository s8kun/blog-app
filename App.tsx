import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
  useSearchParams,
} from "react-router";
import { Post, User } from "./types";
import { MOCK_POSTS, MOCK_USERS } from "./constants";
import Navbar from "./src/components/layout/Navbar";
import BlogList from "./src/components/blog/BlogList";
import BlogDetail from "./src/components/blog/BlogDetail";
import CreatePostForm from "./src/components/blog/CreatePostForm";
import LoginForm from "./src/components/auth/LoginForm";
import SignupForm from "./src/components/auth/SignupForm";
import ProfilePage from "./src/components/auth/ProfilePage";
import Pagination from "./src/components/ui/Pagination";

const POSTS_PER_PAGE = 6;

const AppContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page") || "1"));
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("currentUser");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    // reset to first page when search changes
    setSearchParams({ page: "1" });
  }, [searchQuery]);

  const handleLogin = (identifier: string, password: string) => {
    const user = MOCK_USERS.find(
      (u) =>
        (u.username.toLowerCase() === identifier.toLowerCase() ||
          u.email.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
    );
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = (userData: Omit<User, "id" | "avatarUrl">) => {
    const userExists = MOCK_USERS.some(
      (u) =>
        u.username.toLowerCase() === userData.username.toLowerCase() ||
        u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (userExists) {
      alert("Username or email already exists.");
      return;
    }

    const newUser: User = {
      id: MOCK_USERS.length + 1,
      ...userData,
      avatarUrl: `https://i.pravatar.cc/150?u=${userData.username}`,
    };
    MOCK_USERS.push(newUser);
    setCurrentUser(newUser);
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    navigate("/");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleSelectPost = (post: Post) => {
    // Navigation is handled by <Link> inside BlogCard now.
    // Keep this callback available for analytics or state updates if needed.
    // Example: analytics.track('post.open', { id: post.id });
  };

  const handleSelectUser = (user: User) => {
    // Navigation is handled by <Link> inside BlogCard now.
    // Keep this callback available for analytics or state updates if needed.
    // Example: analytics.track('user.open', { id: user.id });
  };

  const handleCreateOrUpdatePost = (
    postData: Omit<Post, "id" | "author" | "createdAt" | "likes" | "comments">
  ) => {
    if (editingPost) {
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id ? { ...p, ...postData } : p
      );
      setPosts(updatedPosts);
    } else {
      const newPost: Post = {
        ...postData,
        id: posts.length + 1,
        author: currentUser!,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
    }
    navigate("/");
    setEditingPost(null);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    navigate("/create");
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((p) => p.id !== postId));
    navigate("/");
  };

  const handleLike = (postId: number) => {
    if (!currentUser) return;

    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const hasLiked = p.usersWhoLiked?.includes(currentUser.id);
          const updatedUsers = hasLiked
            ? p.usersWhoLiked.filter((id) => id !== currentUser.id)
            : [...(p.usersWhoLiked || []), currentUser.id];

          return {
            ...p,
            likes: hasLiked ? p.likes - 1 : p.likes + 1,
            usersWhoLiked: updatedUsers,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: number, commentText: string) => {
    if (!currentUser) return;
    const newComment = {
      id: Date.now(),
      author: currentUser,
      text: commentText,
      createdAt: new Date().toISOString(),
    };
    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  const navigateToRoute = (route: string) => {
    if (route === "/create" && !currentUser) {
      navigate("/login");
      return;
    }
    navigate(route);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar
        currentUser={currentUser}
        onNavigate={navigateToRoute}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                posts={filteredPosts}
                currentPage={currentPage}
                setCurrentPage={(page: number) =>
                  setSearchParams({ page: String(page) })
                }
                onSelectPost={handleSelectPost}
                onSelectUser={handleSelectUser}
              />
            }
          />
          <Route
            path="/post/:id"
            element={
              <PostDetailPage
                posts={posts}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                currentUser={currentUser}
                onSelectUser={handleSelectUser}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreatePostForm
                onSubmit={handleCreateOrUpdatePost}
                existingPost={editingPost}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                onLogin={handleLogin}
                onNavigate={() => navigate("/signup")}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupForm
                onSignup={handleSignup}
                onNavigate={() => navigate("/login")}
              />
            }
          />
          <Route
            path="/profile/:id?"
            element={
              <ProfilePageWrapper
                posts={posts}
                currentUser={currentUser}
                onSelectPost={handleSelectPost}
                onSelectUser={handleSelectUser}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const HomePage: React.FC<{
  posts: Post[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onSelectPost: (post: Post) => void;
  onSelectUser: (user: User) => void;
}> = ({ posts, currentPage, setCurrentPage, onSelectPost, onSelectUser }) => {
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <>
      <BlogList
        posts={currentPosts}
        onSelectPost={onSelectPost}
        onSelectUser={onSelectUser}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

const PostDetailPage: React.FC<{
  posts: Post[];
  onLike: (postId: number) => void;
  onAddComment: (postId: number, comment: string) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  currentUser: User | null;
  onSelectUser: (user: User) => void;
}> = ({
  posts,
  onLike,
  onAddComment,
  onEdit,
  onDelete,
  currentUser,
  onSelectUser,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <BlogDetail
      post={post}
      onLike={onLike}
      onAddComment={onAddComment}
      onEdit={onEdit}
      onDelete={onDelete}
      currentUser={currentUser}
      onNavigate={(route) => navigate(route)}
      onSelectUser={onSelectUser}
    />
  );
};

const ProfilePageWrapper: React.FC<{
  posts: Post[];
  currentUser: User | null;
  onSelectPost: (post: Post) => void;
  onSelectUser: (user: User) => void;
}> = ({ posts, currentUser, onSelectPost, onSelectUser }) => {
  const { id } = useParams<{ id: string }>();

  const userToShow = id
    ? MOCK_USERS.find((u) => u.id === Number(id)) || currentUser
    : currentUser;

  if (!userToShow) {
    return <div>User not found</div>;
  }

  return (
    <ProfilePage
      user={userToShow}
      userPosts={posts.filter((p) => p.author.id === userToShow.id)}
      onSelectPost={onSelectPost}
      onSelectUser={onSelectUser}
    />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
