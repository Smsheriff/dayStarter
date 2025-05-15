import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const tabIcons = {
  "/": "⏰",
  "/worldclock": "🌍",
  "/stopwatch": "⏱",
  "/timer": "⌛",
};

const tabTitles = {
  "/": "⏰ Alarm",
  "/worldclock": "🌍 World Clock",
  "/stopwatch": "⏱ Stopwatch",
  "/timer": "⌛ Timer",
};

const App = () => {
  const location = useLocation();
  const path = location.pathname;
  const title = tabTitles[path] || "⏰ Alarm";

  return (
    <div className="container">
      <h1>{title}</h1>

      <div className="main-content">
        <Outlet />
      </div>

      <div className="tabs">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          {tabIcons["/"]} Alarm
        </NavLink>
        <NavLink to="/worldclock" className={({ isActive }) => (isActive ? "active" : "")}>
          {tabIcons["/worldclock"]} World Clock
        </NavLink>
        <NavLink to="/stopwatch" className={({ isActive }) => (isActive ? "active" : "")}>
          {tabIcons["/stopwatch"]} Stopwatch
        </NavLink>
        <NavLink to="/timer" className={({ isActive }) => (isActive ? "active" : "")}>
          {tabIcons["/timer"]} Timer
        </NavLink>
      </div>
    </div>
  );
};

export default App;
