import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../constants";
import { token } from "../lib/helpers.lib";

export function ProtectedRoute() {
  if (!token("get")) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
