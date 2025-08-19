import React from "react";
import { BaseComponentProps } from "../../types";
import { cn } from "../../utils/cn";

interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const baseStyles = [
    "inline-flex items-center justify-center",
    "font-medium rounded-xl transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ];

  const variants = {
    primary: [
      "bg-gradient-to-r from-blue-500 to-purple-500",
      "text-white hover:from-blue-600 hover:to-purple-600",
      "focus:ring-blue-500 shadow-lg hover:shadow-xl",
      "transform hover:scale-105 disabled:hover:scale-100",
    ],
    secondary: [
      "bg-gradient-to-r from-gray-100 to-gray-200",
      "text-gray-700 hover:from-gray-200 hover:to-gray-300",
      "focus:ring-gray-400 shadow-md hover:shadow-lg",
    ],
    outline: [
      "border-2 border-gray-300 bg-transparent",
      "text-gray-700 hover:bg-gray-50 hover:border-gray-400",
      "focus:ring-gray-400",
    ],
    ghost: [
      "bg-transparent text-gray-600",
      "hover:bg-gray-100 hover:text-gray-800",
      "focus:ring-gray-400",
    ],
    danger: [
      "bg-gradient-to-r from-red-500 to-red-600",
      "text-white hover:from-red-600 hover:to-red-700",
      "focus:ring-red-500 shadow-lg hover:shadow-xl",
    ],
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn([
        ...baseStyles,
        ...variants[variant],
        sizes[size],
        widthStyles,
        className,
      ])}
      {...props}
    >
      {loading && (
        <svg
          className="w-4 h-4 mr-2 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      
      {children}
      
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;