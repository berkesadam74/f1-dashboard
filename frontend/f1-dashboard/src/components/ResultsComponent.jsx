import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import StartingGrid from "./StartingGrid";
import "./ResultsComponent.css";

export default function ResultsComponent() {
  const { raceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [race, setRace] = useState(location.state?.race || null);
  const [circuit, setCircuit] = useState(location.state?.circuit || null);
  const [results, setResults] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!race || !circuit || race.id !== raceId) {
          const raceRes = await axios.get(
            `http://localhost:8080/api/races/${raceId}`
          );
          setRace(raceRes.data);

          const circuitsRes = await axios.get(
            "http://localhost:8080/api/circuits"
          );
          const foundCircuit = Array.isArray(circuitsRes.data)
            ? circuitsRes.data.find((c) => c.id === raceRes.data?.circuitId)
            : null;
          setCircuit(foundCircuit);
        }

        const [resultsRes, driversRes, teamsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/results?raceId=${raceId}`),
          axios.get("http://localhost:8080/api/drivers"),
          axios.get("http://localhost:8080/api/teams"),
        ]);

        setResults(Array.isArray(resultsRes.data) ? resultsRes.data : []);
        setDrivers(Array.isArray(driversRes.data) ? driversRes.data : []);
        setTeams(Array.isArray(teamsRes.data) ? teamsRes.data : []);
      } catch (error) {
        console.error("Failed to fetch data for race results:", error);
        setResults([]);
        setRace(null);
        setCircuit(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [raceId, location.state]);

  const getDriver = (driverId) => drivers.find((d) => d.id === driverId);
  const getTeam = (teamId) => teams.find((t) => t.id === teamId);

  // Helper for position change indicator
  function getPositionChangeIndicator(result) {
    if (result.position <= 0 || result.gridPosition == null) return null;
    if (result.position < result.gridPosition) {
      // Gained position
      return (
        <span className="pos-indicator up" title="Gained position">
          ▲
        </span>
      );
    }
    if (result.position > result.gridPosition) {
      // Lost position
      return (
        <span className="pos-indicator down" title="Lost position">
          ▼
        </span>
      );
    }
    if (result.position === result.gridPosition) {
      // Remained
      return (
        <span className="pos-indicator same" title="No change">
          ─
        </span>
      );
    }
    return null;
  }

  if (loading || !race || !circuit) {
    return (
      <div className="dashboard-widgets loading-container">
        {loading ? "Loading..." : "Race or circuit not found."}
      </div>
    );
  }

  return (
    <div className="dashboard-widgets">
      <div className="results-overview-card">
        <button className="results-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span className="results-title">
          {race.raceName} — {circuit.circuitName}
        </span>
        <span className="results-date">
          {race.raceDate
            ? new Date(race.raceDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })
            : ""}
        </span>
      </div>

      {Array.isArray(results) && results.length > 0 ? (
        <div className="results-content">
          <div className="results-table-card">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Driver</th>
                  <th>Team</th>
                  <th>Race time</th>
                  <th>Pts.</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .slice()
                  .sort((a, b) => {
                    if (a.position <= 0 && b.position > 0) {
                      return 1;
                    }
                    if (a.position > 0 && b.position <= 0) {
                      return -1;
                    }
                    return a.position - b.position;
                  })
                  .map((result, index) => {
                    const driver = getDriver(result.driverId);
                    const team = getTeam(result.teamId);
                    return (
                      <tr key={result.driverId}>
                        <td colSpan={6}>
                          <div className="results-row">
                            <span className="row-index-results">
                              {result.position > 0 ? result.position : "DNF"}
                              {getPositionChangeIndicator(result)}
                            </span>
                            <span className="driver-info-row-results">
                              <span className="driver-flag">
                                <img
                                  src={`/flags/${(driver?.nationality || "unknown")
                                    .toLowerCase()
                                    .replace(/ /g, "_")}.svg`}
                                  alt={driver?.nationality}
                                  className="results-flag-img"
                                />
                              </span>
                              <span className="driver-name">
                                {driver?.firstName} {driver?.lastName}
                              </span>
                            </span>
                            <span className="team-info-row">
                              <img
                                className="results-team-logo"
                                src={`/teams/${(team?.name || "unknown")
                                  .toLowerCase()
                                  .replace(/ /g, "_")}.png`}
                                alt={team?.name}
                              />
                            </span>
                            <span
                              className={`time-cell ${index === 0
                                  ? "first-time-cell"
                                  : "other-time-cell"
                                } ${result.position === -1 ? "dnf" : ""}`}
                            >
                              {result.position !== -1
                                ? result.totalRaceTime
                                : "DNF"}
                            </span>
                            <span className="points-cell-results">
                              {result.points}
                            </span>
                            <span className="status-cell">
                              {result.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {Array.isArray(results) && results.length > 0 && (
            <StartingGrid results={results} drivers={drivers} />
          )}
        </div>
      ) : (
        <div className="no-results-banner">
          No results logged yet for this race. Check back later!
        </div>
      )}
    </div>
  );
}
