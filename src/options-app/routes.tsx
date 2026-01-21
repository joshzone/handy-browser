import Index from "./pages/index";
import { EditPage } from "./pages/api-providers/EditPage";

export const routesConfig = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/api-provider/create",
    element: <EditPage />
  }
];
