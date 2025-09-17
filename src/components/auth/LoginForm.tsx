import React, { useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

interface LoginFormProps {
  onLogin: (identifier: string, password: string) => void;
  onNavigate: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onNavigate }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (identifier.trim() && password.trim()) {
      onLogin(identifier, password);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-center text-on-surface mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-on-background mb-1"
            >
              Username or Email
            </label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. AlexCode or alex@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-on-background mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;
