import { Route, Routes, useLocation } from "react-router-dom";
import { PATH } from "./constants";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));

function App() {
  const location = useLocation();
  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
