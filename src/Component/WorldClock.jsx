import React, { useEffect, useState } from "react";
import "../CSS/WorldClock.css";


const initialTimezones = [
  { countryName: "India", zoneName: "Asia/Kolkata" },
  { countryName: "United Kingdom", zoneName: "Europe/London" },
  { countryName: "United States", zoneName: "America/New_York" },
];

const WorldClock = () => {
  const [timezones, setTimezones] = useState(initialTimezones);
  const [times, setTimes] = useState({});
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [allTimezones, setAllTimezones] = useState([]); 
  const api = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchAllTimezones = async () => {
      try {
        const response = await fetch(
          api
        );
        const data = await response.json();
        if (data.status === "OK") {
          setAllTimezones(data.zones);
        } else {
          console.error("Failed to fetch timezones:", data.message);
        }
      } catch (error) {
        console.error("Error fetching timezones:", error);
      }
    };

    fetchAllTimezones();
  });

  useEffect(() => {
    const update = () => {
      const updated = {};
      timezones.forEach(({ zoneName }) => {
        const local = new Date().toLocaleString("en-US", { timeZone: zoneName });
        const formatted = new Date(local).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        updated[zoneName] = formatted;
      });
      setTimes(updated);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezones]);

  const handleAddCity = () => {
    const city = search.trim().toLowerCase();
    if (!city) return;

    const matched = allTimezones.find((zone) =>
      zone.countryName.toLowerCase().includes(city) ||
      zone.zoneName.toLowerCase().includes(city)
    );

    if (matched) {
      const alreadyExists = timezones.some((t) => t.zoneName === matched.zoneName);
      if (!alreadyExists) {
        setTimezones([...timezones, { countryName: matched.countryName, zoneName: matched.zoneName }]);
      } else {
        alert("City already added!");
      }
    } else {
      alert("City not found in timezones!");
    }
    setSearch("");
    setShowInput(false);
  };

  const handleRemoveCity = (zoneName) => {
    const updated = timezones.filter((zone) => zone.zoneName !== zoneName);
    setTimezones(updated);
  };

  return (
    <div className="worldclock-container">
      {timezones.map(({ countryName, zoneName }) => (
        <div key={zoneName} className="clock-card">
          <div className="clock-info">
            <div>
              <h3>{countryName}</h3>
              <p className="offset">{zoneName}</p>
            </div>
            <div className="time">
              {times[zoneName]?.split(" ")[0]}
              <span className="ampm">{times[zoneName]?.split(" ")[1]}</span>
            </div>
          </div>
          <button className="remove-btn" onClick={() => handleRemoveCity(zoneName)}>✖</button>
        </div>
      ))}

      <div className="add-city-container">
        {showInput ? (
          <div className="input-box">
            <input
              type="text"
              value={search}
              placeholder="Enter country or timezone"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleAddCity}>Add</button>
          </div>
        ) : (
          <button className="plus-btn" onClick={() => setShowInput(true)}>＋</button>
        )}
      </div>
    </div>
  );
};

export default WorldClock;
