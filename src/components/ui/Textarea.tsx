import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => {
  const baseStyles =
    "w-full px-3 py-2 bg-surface border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-on-surface";

  return (
    <textarea className={`${baseStyles} ${className}`} {...props}></textarea>
  );
};

export default Textarea;
