import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface ProgressHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  backPath?: string;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  title,
  currentStep,
  totalSteps,
  onBack,
  backPath,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative px-4 py-6 bg-white shadow-sm">
      <button
        onClick={handleBack}
        className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex justify-center mt-2">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-8 h-1.5 rounded-full ${
                  index + 1 === currentStep
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : index + 1 < currentStep
                    ? "bg-blue-300"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;