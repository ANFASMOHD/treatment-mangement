import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TreatmentListPage from "./pages/TreatmentListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/treatments" element={<TreatmentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
