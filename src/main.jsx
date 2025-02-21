import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes.jsx";
import { AuthProvider } from "./services/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <Routes />
    </StrictMode>
  </AuthProvider>
);
