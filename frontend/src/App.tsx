import { Route, Routes, useLocation } from "react-router-dom";
import { API_ENDPIINTS, BASE_URL, PATH } from "./constants";
import { lazy, useEffect } from "react";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { token } from "./lib/helpers.lib";
import { useOnlineUsersStore, type OnlineUser } from "./store/onlineUsers";

const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));

function App() {
  const location = useLocation();
  const authToken = token("get");
  const isAuthPage = [PATH.LOGIN, PATH.REGISTER].includes(location.pathname);
  const setUsers = useOnlineUsersStore((state) => state.setUsers);
  const setAmIOnline = useOnlineUsersStore((state) => state.setAmIOnline);

  useEffect(() => {
    if (!authToken || isAuthPage) {
      setUsers([]);
      setAmIOnline(false);
      return;
    }

    const controller = new AbortController();

    void fetchEventSource(`${BASE_URL}${API_ENDPIINTS.EVENTS.ONLINE_USERS}`, {
      method: "GET",
      signal: controller.signal,
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
  }, [authToken, isAuthPage, setAmIOnline]);

  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
