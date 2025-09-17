import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  const baseStyles =
    "w-full px-3 py-2 bg-surface border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface";

  return <input className={`${baseStyles} ${className}`} {...props} />;
};

export default Input;
