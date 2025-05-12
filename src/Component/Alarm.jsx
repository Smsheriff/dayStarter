import React, { useState, useEffect } from "react";
import { FaBell, FaClock, FaTrash } from "react-icons/fa";
import "../CSS/Alaram.css";

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarms, setAlarms] = useState(() => {
    const saved = localStorage.getItem("alarms");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5);
      console.log(current);
      
      alarms.forEach((alarm) => {
        if (alarm.time === current && alarm.enabled && !alarm.triggered) {
          ringAlarm(alarm.time);
          alarm.triggered = true;
          setAlarms([...alarms]);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  const ringAlarm = (time) => {
    const audio = new Audio("/iphone_alarm.mp3");
    audio.loop = true;
    audio.play().catch(() => console.warn("Autoplay prevented."));
    setTimeout(() => {
      alert(`⏰ Alarm for ${time}`);
      audio.pause();
      audio.currentTime = 0;
    }, 200);
  };

  const formatTime = (time) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const addAlarm = () => {
    if (!alarmTime) return;
    setAlarms([
      ...alarms,
      { time: alarmTime, enabled: true, triggered: false },
    ]);
    setAlarmTime("");
  };

  const toggleAlarm = (index) => {
    const updated = alarms.map((alarm, i) =>
      i === index
        ? { ...alarm, enabled: !alarm.enabled, triggered: false }
        : alarm
    );
    setAlarms(updated);
  };

  const deleteAlarm = (index) => {
    const updated = alarms.filter((_, i) => i !== index);
    setAlarms(updated);
  };

  return (
    <div className="glass-card">
      <div className="alarm-header">
        <FaBell />
        <h2>Alarm Clock</h2>
        {/* <button className="add-btn" onClick={addAlarm}><TbClockPlus /></button> */}
        <button className="add-btn" onClick={addAlarm}>
          Add +
        </button>
      </div>

      <div className="input-wrapper">
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
      </div>

      {alarms.map((alarm, index) => (
        <div className="alarm-item" key={index}>
          <div className="time-label">
            {formatTime(alarm.time)}
            <FaClock className="clock-icon" />
          </div>
          <button
            className={`status-btn ${alarm.enabled ? "active" : "inactive"}`}
            onClick={() => toggleAlarm(index)}
          >
            {alarm.enabled ? "Active" : "Off"}
          </button>
          <button className="delete-btn" onClick={() => deleteAlarm(index)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alarm;
