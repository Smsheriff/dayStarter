import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Alarm from "./Component/Alarm";
import WorldClock from "./Component/WorldClock";
import Stopwatch from "./Component/Stopwatch";
import Timer from "./Component/Timer";
import "./CSS/Loader.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Alarm /> },
      { path: "worldclock", element: <WorldClock /> },
      { path: "stopwatch", element: <Stopwatch /> },
      { path: "timer", element: <Timer /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
