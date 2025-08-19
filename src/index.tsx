import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// App Router 스타일 컴포넌트 import
import RootLayout from "./app/layout";
import HomePage from "./app/home/page";
import MainPage from "./app/main/page";
import ThemePage from "./app/theme/page";
import FairytaleePage from "./app/fairytale/page";
import ConnectionTest from "./components/ui/ConnectionTest";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RootLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/fairytale" element={<FairytaleePage />} />
          <Route path="/test" element={<ConnectionTest />} />
        </Routes>
      </Router>
    </RootLayout>
  </React.StrictMode>
);
