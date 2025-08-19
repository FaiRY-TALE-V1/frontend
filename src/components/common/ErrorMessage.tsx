import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, RotateCcw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  emoji?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  retryPath?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "앗, 문제가 발생했어요",
  message,
  emoji = "😔",
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
  retryPath = "/theme",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      navigate(retryPath);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-orange-100 ${className}`}
    >
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">{emoji}</div>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        
        <div className="flex flex-col gap-3 sm:flex-row">
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="px-6 py-3 text-white transition-all duration-300 bg-blue-500 rounded-xl hover:bg-blue-600 hover:scale-105"
            >
              다시 시도하기
            </button>
          )}
          
          {showHomeButton && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center px-6 py-3 text-gray-600 transition-all duration-300 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-2" />
              처음으로
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-3 font-medium text-purple-600 transition-all duration-200 border border-purple-300 rounded-xl hover:bg-purple-50 hover:border-purple-400"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;