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

  // localStorage에서 프로필과 테마 확인
  const hasProfileInStorage = Boolean(localStorage.getItem("childProfile"));
  const hasThemeInStorage = Boolean(localStorage.getItem("selectedTheme"));

  if (requireTheme && !canProceedToStory && !hasThemeInStorage) {
    return <Navigate to="/theme" replace />;
  }

  if (requireProfile && !canProceedToTheme && !hasProfileInStorage) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;