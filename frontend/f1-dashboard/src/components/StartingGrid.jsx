import React from "react";
import "./StartingGrid.css";

export default function StartingGrid({ results, drivers }) {
  const getDriver = (driverId) => drivers.find((d) => d.id === driverId);

  // Sort results by grid position
  const sortedResults = Array.isArray(results)
    ? [...results].sort((a, b) => a.gridPosition - b.gridPosition)
    : [];

  return (
    <div className="starting-grid-card">
      <div className="starting-grid-title">Starting Grid</div>
      <div className="starting-grid-layout">
        {sortedResults.map((result) => {
          const driver = getDriver(result.driverId);
          return (
            <div className="grid-item" key={result.driverId}>
              <div className="grid-left">
                <img
                  className="grid-driver-img"
                  src={`/drivers/${driver?.firstName.toLowerCase()}_${driver.lastName.toLowerCase()}.png`}
                  alt={driver?.lastName}
                  onError={e => (e.target.style.display = "none")}
                />
                <span className="grid-position">{result.gridPosition}</span>
              </div>
              <div className="grid-right">
                <span className="grid-driver-code">
                  {driver ? getDriverCode(driver.firstName, driver.lastName) : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getDriverCode(firstName, lastName) {
  return (lastName ? lastName.substring(0, 3) : firstName.substring(0, 3)).toUpperCase();
}
