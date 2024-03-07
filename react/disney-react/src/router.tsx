import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <h1>Home</h1> },
      {
        path: "/character/:id",
        element: <h1>Details</h1>,
      },
    ],
  },
]);

export default router;
