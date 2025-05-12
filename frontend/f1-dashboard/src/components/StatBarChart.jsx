import React from "react";
import "./StatBarChart.css";

const TEAM_COLORS = {
  "Red Bull Racing": "#1e41ff",
  "Scuderia Ferrari": "#dc0000",
  "Mercedes AMG Petronas": "#00d2be",
  "McLaren Mercedes": "#ff8700",
  "Aston Martin Aramco Cognizant F1 Team": "#006f62",
  "Alpine F1 Team": "#2293d1",
  "Williams Racing": "#00a3e0",
  "Visa Cash App RB": "#6692ff",
  "Haas F1 Team": "#b6babd",
  "Kick Sauber F1 Team": "#52e252",
};

// Pomocne funkcie
function getDriverImgUrl(driverId) {
  return `/drivers/${driverId}.png`;
}
function getDriverCode(firstName, lastName) {
  return (lastName ? lastName.substring(0, 3) : firstName.substring(0, 3)).toUpperCase();
}

export default function StatBarChart({ data, title, color = "#f857a6" }) {
  const safeData = Array.isArray(data) ? data : [];
  const maxValue = safeData.length > 0 ? Math.max(...safeData.map(d => d.value)) : 1;

  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-list">
        {safeData.map((driver) => (
          <div className="stat-row" key={driver.driverId}>
            <img
              className="stat-driver-img"
              src={getDriverImgUrl(driver.driverId)}
              alt={driver.lastName}
              onError={e => (e.target.style.display = "none")}
            />
            <span className="stat-driver-code">
              {getDriverCode(driver.firstName, driver.lastName)}
            </span>
            <span className="stat-value">{driver.value}</span>
            <div className="stat-bar-bg">
              <div
                className="stat-bar"
                style={{
                  width: `${(driver.value / maxValue) * 100}%`,
                  background: TEAM_COLORS[driver.teamName] || color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
