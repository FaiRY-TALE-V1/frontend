import React, { forwardRef } from "react";
import { BaseComponentProps } from "../../types";
import { cn } from "../../utils/cn";

interface InputProps extends BaseComponentProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, leftIcon, rightIcon, className, ...props }, ref) => {
    const baseStyles = [
      "w-full px-4 py-4 border-2 rounded-xl",
      "focus:ring-4 focus:ring-blue-100 focus:border-blue-500",
      "transition-all duration-200 text-lg",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ];

    const stateStyles = error
      ? ["border-red-500 bg-red-50 focus:ring-red-100 focus:border-red-500"]
      : ["border-gray-200 bg-gray-50 focus:bg-white"];

    const paddingStyles = [];
    if (leftIcon) paddingStyles.push("pl-12");
    if (rightIcon) paddingStyles.push("pr-12");

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={cn([...baseStyles, ...stateStyles, ...paddingStyles, className])}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;