import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "../constants";
import { token } from "../lib/helpers.lib";

export const LAST_PRIVATE_PATH_KEY = "last-private-path";

export function AuthRoute() {
  if (token("get")) {
    const redirectTo =
      sessionStorage.getItem(LAST_PRIVATE_PATH_KEY) || PATH.HOME;
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
