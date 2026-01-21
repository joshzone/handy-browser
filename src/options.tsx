import "@lib/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OptionsApp } from "./options-app";


const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <OptionsApp />
    </StrictMode>
  );
}
