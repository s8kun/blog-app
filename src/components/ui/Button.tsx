import React from "react";

// نقل الأنماط خارج المكون لتجنب إعادة الإنشاء
const baseStyles =
  "px-4 py-2 rounded-md font-medium focus:outline-none transition-colors";

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  ghost: "text-white",
  danger: "bg-red-600 text-white hover:bg-red-700",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
