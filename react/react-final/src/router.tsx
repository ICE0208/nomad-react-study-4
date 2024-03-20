import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home, Popular } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/coming-soon",
        element: <h1>Coming Soon</h1>,
      },
      {
        path: "/now-playing",
        element: <h1>Now Playing</h1>,
      },
    ],
  },
]);

export default router;
