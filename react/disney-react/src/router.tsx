import { createBrowserRouter } from "react-router-dom";
import { Detail, Home } from "./pages";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/character/:id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
