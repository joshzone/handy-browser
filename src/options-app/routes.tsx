import Index from "./pages/index";
import { EditPage } from "./pages/api-providers/EditPage";
import SelectApi from "./pages/api-providers/SelectApi";

export const routesConfig = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/api-providers",
    element: <SelectApi />
  },
  {
    path: "/api-provider/create",
    element: <EditPage />
  },
  {
    path: "/api-provider/edit/:id",
    element: <EditPage />
  }
];
