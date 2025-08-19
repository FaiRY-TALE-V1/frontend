import React from "react";
import { BaseComponentProps } from "../../types";
import { cn } from "../../utils/cn";

interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  icon,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="flex items-center text-lg font-semibold text-gray-800">
          {icon && (
            <div className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-100 rounded-full">
              {icon}
            </div>
          )}
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      <div className="relative">{children}</div>

      {error && (
        <div className="flex items-center text-sm text-red-500">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;