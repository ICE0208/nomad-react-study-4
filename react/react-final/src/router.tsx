import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

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
        element: <h1>Popular</h1>,
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
