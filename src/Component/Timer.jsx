

import React, { useEffect, useRef, useState } from "react";
import "../CSS/Timer.css";

const ScrollPicker = ({ values, onChange, type }) => {
  const containerRef = useRef(null);
  const ITEM_HEIGHT = 40;
 
  const MID_INDEX = Math.floor((values.length * 50)); 

  const bigList = Array(100).fill(values).flat(); 

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = MID_INDEX * ITEM_HEIGHT;
    }
  }, );

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const actualValue = bigList[index % values.length];
    onChange(actualValue);
  };

  return (
    <div className="picker-column">
      <div
        className="scroll-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div style={{ paddingTop: ITEM_HEIGHT * 2, paddingBottom: ITEM_HEIGHT * 2 }}>
          {bigList.map((val, idx) => {
            const offset = idx - Math.round(containerRef.current?.scrollTop / ITEM_HEIGHT);
            const isSelected = offset === 0;
            return (
              <div
                key={idx}
                className="scroll-item"
                style={{
                  fontSize: isSelected ? "28px" : "20px",
                  color: isSelected ? "#fff" : "#666",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {String(val).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>
      <div className="label">{type}</div>
    </div>
  );
};

const TimerPicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds === 0) return;
    setTimeLeft(totalSeconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(null);
  };

  const formatTime = (totalSec) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="timer-page">
      <h2>Set Timer</h2>
      <div className="picker-wrapper">
        <ScrollPicker values={[...Array(100).keys()]} onChange={setHours} type="Hours" />
        <ScrollPicker values={[...Array(60).keys()]} onChange={setMinutes} type="Minutes" />
        <ScrollPicker values={[...Array(60).keys()]} onChange={setSeconds} type="Seconds" />
      </div>

      <div className="selected-time">
        {timeLeft !== null
          ? formatTime(timeLeft)
          : `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`}
          
      </div>

      <div className="button-group">
        <button onClick={startTimer}>Start</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default TimerPicker;
