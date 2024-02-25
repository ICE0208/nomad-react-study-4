import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Character from "./Character.jsx";
import GlobalStyle from "./GlobalStyle.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/character/:id",
        element: <Character />,
      },
    ],
  },
  {},
  {
    path: "/*",
    element: <h1>Not FOUND</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
  // </React.StrictMode>
);
