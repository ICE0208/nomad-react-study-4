import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ComingSoon, Home, NowPlaying, Popular } from "./pages";

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
        element: <ComingSoon />,
      },
      {
        path: "/now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);

export default router;
