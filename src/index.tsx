import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";

// 컴포넌트 import
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ThemeSelection from "./pages/ThemeSelection";
import StoryGeneration from "./pages/StoryGeneration";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AppProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <RootLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route 
                path="/theme" 
                element={
                  <ProtectedRoute requireProfile={true}>
                    <ThemeSelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/story" 
                element={
                  <ProtectedRoute requireTheme={true}>
                    <StoryGeneration />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </RootLayout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
