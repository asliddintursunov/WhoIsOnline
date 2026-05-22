import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Nav from "./components/nav/index.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <Nav />
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
