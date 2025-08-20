import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./app/layout";
import HomePage from "./app/home/page";
import MainPage from "./app/main/page";
import ThemePage from "./app/theme/page";
import FairytaleePage from "./app/fairytale/page";
import ConnectionTest from "./components/ui/ConnectionTest";

function App() {
  return (
    <RootLayout>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/theme" element={<ThemePage />} />
            <Route path="/fairytale" element={<FairytaleePage />} />
            <Route path="/test" element={<ConnectionTest />} />
          </Routes>
        </div>
      </Router>
    </RootLayout>
  );
}

export default App;
