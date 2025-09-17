import React, { useState } from "react";
import { Link } from "react-router";
import { User } from "../../../types";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

interface SignupFormProps {
  onSignup: (userData: Omit<User, "id" | "avatarUrl">) => void;
  onNavigate: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // amazonq-ignore-next-line
    // amazonq-ignore-next-line
    if (Object.values(formData).every((field) => field.trim())) {
      onSignup(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-center text-on-surface mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-on-background mb-1"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Alex Coder"
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-on-background mb-1"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a cool username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-on-background mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full !mt-6">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignupForm;
