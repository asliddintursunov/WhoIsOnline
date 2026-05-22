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
  const { setUsers } = useOnlineUsersStore();

  useEffect(() => {
    if (![PATH.REGISTER, PATH.LOGIN].includes(location.pathname)) {
      fetchEventSource(`${BASE_URL}${API_ENDPIINTS.EVENTS.ONLINE_USERS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token("get")}`,
        },
        onmessage(event) {
          const data: OnlineUser[] = JSON.parse(event.data);
          setUsers(data);
        },
        onerror(error) {
          console.error(error);
        },
        onclose() {
          console.log("Connection closed");
        },
      });
    }

    return () => {};
  }, [location]);

  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
