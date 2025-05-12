import React, { useEffect, useState } from "react";
import Alarm from "./Component/Alarm";
import WorldClock from "./Component/WorldClock";
import Stopwatch from "./Component/Stopwatch";
import Timer from "./Component/Timer";
import './CSS/Loader.css'

const tabIcons = {
  Alarm: "⏰",
  WorldClock: "🌍",
  Stopwatch: "⏱",
  Timer: "⌛",
};

const tabTitles = {
  Alarm: "⏰ Alarm",
  Worldclock: "🌍 World Clock",
  Stopwatch: "⏱ Stopwatch",
  Timer: "⌛ Timer",
};

const App = () => {
  const [tab, setTab] = useState("Alarm");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });

  return (
    <div className="container">
      <h1>{tabTitles[tab]}</h1>

      <div className="main-content">
        {tab === "Alarm" && <Alarm />}
        {tab === "WorldClock" && <WorldClock />}
        {tab === "Stopwatch" && <Stopwatch />}
        {loader &&
        <div className="main">
          <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          </div> 
        }
        {tab === "Timer" && <Timer />}
        
      </div>

      <div className="tabs">
        {["Alarm", "WorldClock", "Stopwatch", "Timer"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setLoader(true)
            }}
            className={tab === t ? "active" : ""}
          >
            {tabIcons[t]} {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
