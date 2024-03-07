import { Link, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <h1>
            <Link to="/character/34">Go Detail</Link>
          </h1>
        ),
      },
      {
        path: "/character/:id",
        element: (
          <h1>
            <Link to="/">Go Home</Link>
          </h1>
        ),
      },
    ],
  },
]);

export default router;
