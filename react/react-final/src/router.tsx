import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ComingSoon, Home, NotFound, NowPlaying, Popular } from "./pages";

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
        path: "/popular/:id?",
        element: <Popular />,
      },
      {
        path: "/coming-soon/:id?",
        element: <ComingSoon />,
      },
      {
        path: "/now-playing/:id?",
        element: <NowPlaying />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
