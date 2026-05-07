import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import { useEffect } from "react";
import { getUserData } from "./lib/helpers";
import HomePage from "./pages/Home";
import { connectSocket } from "./lib/socket";

function App() {
  const location = useLocation();
  const user_data = getUserData();

  useEffect(() => {
    if (!user_data && location.pathname !== "/login") {
      window.location.href = "/login";
    } else if (user_data && location.pathname === "/login") {
      window.location.href = "/";
    }
  }, [location]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsed = JSON.parse(user);
      connectSocket(parsed.id);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
