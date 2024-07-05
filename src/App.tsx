// src/App.tsx
// import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

// function App() {
const App: React.FC = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const handleToggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
