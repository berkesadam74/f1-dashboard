import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriverStandings.css";

// Pomocne funkcie pre obrazky
const getFlagUrl = (nationality) =>
  `/flags/${nationality.toLowerCase().replace(/ /g, "_")}.svg`;

const getDriverImgUrl = (firstName, lastName) =>
  `/drivers/${firstName.toLowerCase()}_${lastName.toLowerCase()}.png`;

const getTeamLogoUrl = (teamName) =>
  `/teams/${teamName.toLowerCase().replace(/ /g, "_")}.png`;

const API_URL = "http://localhost:8080/api/standings/drivers?season=2025";

export default function DriverStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setStandings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="standings-card">Loading...</div>;

  return (
    <div className="standings-card">
      <div className="standings-title">Driver Standings 2025</div>
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>Team</th>
            <th className="points-cell">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((driver, idx) => (
            <tr key={driver.driverId}>
              <td colSpan={4}>
                <div className="bubble-row">
                  <span className="row-index">{idx + 1}</span>
                  <span className="driver-info-row">
                    <img
                      className="driver-flag"
                      src={getFlagUrl(driver.nationality)}
                      alt={driver.nationality}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <img
                      className="driver-img"
                      src={getDriverImgUrl(driver.firstName, driver.lastName)}
                      alt={driver.firstName + " " + driver.lastName}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <span className="driver-name">
                      {driver.firstName} {driver.lastName}
                    </span>
                  </span>
                  <span className="team-info-row">
                    <span className="team-name">{driver.teamName}</span>
                    <img
                      className="team-logo"
                      src={getTeamLogoUrl(driver.teamName)}
                      alt={driver.teamName}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </span>
                  <span className="points-cell">{driver.points}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
