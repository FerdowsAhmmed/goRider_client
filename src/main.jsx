import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapBoxComponent from "./components/MapBoxComponent.jsx";
import BlogDetails from "./components/Pages/HomePage/BlogDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/map",
    element: <MapBoxComponent />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
