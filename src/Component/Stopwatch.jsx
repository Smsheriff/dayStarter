import React, { useEffect, useState } from "react";
import "../CSS/StopWatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
       interval = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
 
  return (
    <div className="stopwatch-wrapper">
      <p className="time-display">{format(time)}</p>
      <div className="button-group">
        <button onClick={() => setRunning(!running)} className="primary">
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setTime(0);
            setLaps([]);
            setRunning(false);
          }}
          className="secondary"
        >
          Reset
        </button>
        {running && (
          <button onClick={() => setLaps([...laps, time])} className="primary">
            Lap
          </button>
        )}
      </div>
      <div className="laps">
        {laps.map((lap, i) => (
          <p key={i}>Lap {i + 1}: {format(lap)}</p>
          
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
