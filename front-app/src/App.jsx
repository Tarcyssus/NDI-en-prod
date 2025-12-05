import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizSelection from "./pages/QuizSelection.jsx";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz.jsx";
import Page3 from "./pages/Page3";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { LoadingShell } from "./components/LoadingContext";
import klubLogo from "./assets/klub_logo.gif";

export default function App() {
  return (
    <Router>
      <LoadingShell gifPath={klubLogo}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizSelection />} />
          <Route path="/quiz/:theme" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </LoadingShell>
    </Router>
  );
}
