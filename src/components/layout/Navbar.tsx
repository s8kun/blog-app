import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router";
import { User } from "../../../types";
import Button from "../ui/Button";
import { Search, Menu, X } from "lucide-react";

interface NavbarProps {
  currentUser: User | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}> = ({ searchQuery, setSearchQuery, className = "" }) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-[25%] h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search posts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-background border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onNavigate,
  onLogout,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, [onNavigate]);

  const handleLogoutClick = useCallback(() => {
    onLogout();
    setIsMenuOpen(false);
  }, [onLogout]);

  const handleAvatarError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentUser?.username}&background=6366f1&color=fff`;
    },
    [currentUser?.username]
  );

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <>
      <Link
        to="/create"
        onClick={(e) => {
          // If user not logged in, intercept and redirect to login
          if (!currentUser) {
            e.preventDefault();
            navigate("/login");
            setIsMenuOpen(false);
            return;
          }
          setIsMenuOpen(false);
          onNavigate("/create");
        }}
      >
        <Button variant="ghost">Create Post</Button>
      </Link>
      {currentUser ? (
        <div
          className={`flex items-center ${
            isMobile ? "flex-col space-y-4" : "space-x-4"
          }`}
        >
          <Link
            to={`/profile/${currentUser.id}`}
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate("/profile");
            }}
            className="flex items-center space-x-2"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.username}
              className="w-9 h-9 rounded-full"
              onError={handleAvatarError}
            />
            <span className="font-semibold">{currentUser.username}</span>
          </Link>
          <Button variant="secondary" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      ) : (
        <div
          className={`flex items-center ${
            isMobile ? "flex-col space-y-4" : "space-x-2"
          }`}
        >
          <Link
            to="/login"
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate("/login");
            }}
          >
            <Button variant="ghost">Login</Button>
          </Link>
          <Link
            to="/signup"
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate("/signup");
            }}
          >
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <header className="bg-surface shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-xl sm:text-2xl font-bold text-primary cursor-pointer"
          onClick={() => handleNavClick()}
        >
          <Link to="/">Blog</Link>
        </div>

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="flex-1 max-w-xs sm:max-w-md mx-4 hidden sm:block"
        />

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-surface absolute top-full left-0 w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 flex flex-col items-center space-y-4">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              className="w-full max-w-xs sm:hidden"
            />
            <NavLinks isMobile />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
