import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

// 컴포넌트 import
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ThemeSelection from "./pages/ThemeSelection";
import StoryGeneration from "./pages/StoryGeneration";
import { AppProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/theme" element={<ThemeSelection />} />
            <Route path="/story" element={<StoryGeneration />} />
          </Routes>
        </RootLayout>
      </Router>
    </AppProvider>
  </React.StrictMode>
);
