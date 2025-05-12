import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NextRaces.css";

export default function NextRaces() {
  const [nextRaces, setNextRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/races/next?count=5")
      .then(res => {
        setNextRaces(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDateRange = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    // Assuming race weekend is Fri-Sun, get Fri and Sun dates
    const raceDay = date.getUTCDate();
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    // This is a simplification, real race weekends might vary
    const startDay = raceDay - 2 > 0 ? raceDay - 2 : raceDay; // Approx Fri
    const endDay = raceDay; // Sun
    return `${startDay}-${endDay} ${month}`;
  };

  if (loading) return <div className="next-races-card">Loading...</div>;

  return (
    <div className="next-races-card">
      <div className="next-races-title">Next 5 races</div>
      <ul className="next-races-list">
        {nextRaces.map((race) => (
          <li className="next-race-item" key={race.id}>
            <img
              className="next-race-flag"
              src={`/flags/${(race.country || "unknown").toLowerCase().replace(/ /g, "_")}.svg`}
              alt={race.country}
            />
            <div className="next-race-info">
              <span className="next-race-country">{race.country}</span>
              <span className="next-race-circuit">{race.circuitName}</span>
            </div>
            <span className="next-race-date">{formatDateRange(race.raceDate)}</span>
            <img
              className="next-race-map"
              src={`/circuits/${(race.circuitName || "unknown").toLowerCase().replace(/ /g, "_")}.png`}
              alt={race.circuitName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
