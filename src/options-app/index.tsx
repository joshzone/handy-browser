import "@lib/styles/globals.css";
import { HashRouter, useRoutes } from "react-router-dom";
import { routesConfig } from "./routes";

const manifest =
  typeof chrome !== "undefined" && chrome.runtime?.getManifest
    ? chrome.runtime.getManifest()
    : null;
const extensionName = manifest?.name ?? "Extension";
const extensionVersion = manifest?.version ?? "0.0.0";

function AppRoutes() {
  const routes = useRoutes(routesConfig);
  return (
    <div>
      <h1 className="text-lg font-semibold">{extensionName} Settings</h1>

      {routes}

      <p className="mt-6 text-xs text-gray-500">
        Version {extensionVersion}
      </p>
    </div>
  );
}

export function OptionsApp() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900 px-6 py-8 text-white">
        <AppRoutes />
      </div>
    </HashRouter>
  );
}

