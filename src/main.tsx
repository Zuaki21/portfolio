import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// ?path=/gallery のようなURLがある場合、pushStateでルートを復元
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("path");

if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
