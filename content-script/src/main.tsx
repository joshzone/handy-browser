import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@lib/styles/globals.css";
import App from "./App";

const existing = document.getElementById("extension-root");
const container = existing ?? document.createElement("div");
if (!existing) {
  container.id = "extension-root";
  document.body.appendChild(container);
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
