import { Route, Routes, useLocation } from "react-router-dom";
import { API_ENDPIINTS, BASE_URL, PATH } from "./constants";
import { lazy, useEffect } from "react";

import { AuthRoute, LAST_PRIVATE_PATH_KEY } from "./routes/AuthRoute";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { token } from "./lib/helpers.lib";
import { useOnlineUsersStore, type OnlineUser } from "./store/onlineUsers";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));

function App() {
  const location = useLocation();
  const authToken = token("get");
  const isAuthPage = [PATH.LOGIN, PATH.REGISTER].includes(location.pathname);
  const setUsers = useOnlineUsersStore((state) => state.setUsers);
  const setAmIOnline = useOnlineUsersStore((state) => state.setAmIOnline);

  useEffect(() => {
    if (authToken && !isAuthPage) {
      sessionStorage.setItem(LAST_PRIVATE_PATH_KEY, location.pathname);
    }
  }, [authToken, isAuthPage, location.pathname]);

  useEffect(() => {
    if (!authToken) {
      setUsers([]);
      setAmIOnline(false);
      return;
    }

    const controller = new AbortController();

    void fetchEventSource(`${BASE_URL}${API_ENDPIINTS.EVENTS.ONLINE_USERS}`, {
      method: "GET",
      signal: controller.signal,
      openWhenHidden: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      onmessage(event) {
        const data: OnlineUser[] = JSON.parse(event.data);
        setUsers(data);
        setAmIOnline(true);
      },
      onerror(error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      },
      onclose() {
        setAmIOnline(false);
      },
    }).catch((error) => {
      if (!controller.signal.aborted) {
        console.error(error);
      }
    });

    return () => {
      controller.abort();
      setAmIOnline(false);
    };
  }, [authToken, setUsers, setAmIOnline]);

  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
