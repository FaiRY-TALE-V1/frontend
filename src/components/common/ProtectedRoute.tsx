import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
  requireTheme?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireProfile = false,
  requireTheme = false,
}) => {
  const { canProceedToTheme, canProceedToStory } = useAppContext();

  if (requireTheme && !canProceedToStory) {
    return <Navigate to="/theme" replace />;
  }

  if (requireProfile && !canProceedToTheme) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;