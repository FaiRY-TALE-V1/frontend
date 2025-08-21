import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ThemePage from "./pages/ThemePage";
import FairytaleePage from "./pages/Fairytale";
import ImageEditDemo from "./pages/ImageEditDemo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<ProfilePage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/fairytale" element={<FairytaleePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
