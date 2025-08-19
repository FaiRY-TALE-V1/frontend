import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  subtitle?: string;
  showProgressBar?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "로딩 중...",
  subtitle,
  showProgressBar = false,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 ${className}`}
    >
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <Loader2 className="w-full h-full text-purple-500 animate-spin" />
          </div>
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
        </div>
        
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          ✨ {message}
        </h2>
        
        {subtitle && (
          <p className="mb-6 text-lg text-gray-600">{subtitle}</p>
        )}
        
        {showProgressBar && (
          <div className="max-w-md mx-auto">
            <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;