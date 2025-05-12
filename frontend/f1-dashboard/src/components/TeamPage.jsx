import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResultsComponent.css"; // Reuse your styles

// Helper functions for images
const getFlagUrl = (nationality) =>
  `/flags/${nationality.toLowerCase().replace(/ /g, "_")}.svg`;

const getDriverImgUrl = (firstName, lastName) =>
  `/drivers/${firstName.toLowerCase()}_${lastName.toLowerCase()}.png`;

function DriversModal({ open, onClose, team, drivers, results }) {
  if (!open || !team) return null;

  // Helper to get best result for a driver (lowest position)
  const getBestResultForDriver = (driverId) => {
    const driverResults = results.filter(
      (r) => r.driverId === driverId && r.position > 0
    );
    if (!driverResults.length) return null;
    return driverResults.reduce((best, curr) =>
      curr.position < best.position ? curr : best
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(24,28,47,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#23284a",
          borderRadius: 16,
          padding: 32,
          minWidth: 600,
          maxWidth: 520,
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          position: "relative",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 18,
            top: 18,
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "4px 14px",
            fontWeight: 700,
            fontSize: "1.2em",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <h2 style={{ marginTop: 0, marginBottom: 18, color: "#fff" }}>
          {team.name} Drivers
        </h2>
        {drivers.length === 0 && (
          <div style={{ color: "#b0b3c6" }}>No drivers found.</div>
        )}
        {drivers.map((driver) => {
          const bestResult = getBestResultForDriver(driver._id || driver.id);
          return (
            <div
              key={driver._id || driver.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 18,
                color: "#fff",
                minHeight: 72,
                background: "#181c2f",
                borderRadius: 10,
                padding: "10px 14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              }}
            >
              <img
                className="driver-img"
                src={getDriverImgUrl(driver.firstName, driver.lastName)}
                alt={driver.firstName + " " + driver.lastName}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 16,
                  border: "2px solid #6a5af9",
                  background: "#23284a",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontWeight: 700,
                      marginRight: 10,
                      minWidth: 32,
                      color: "#f857a6",
                      fontSize: "1.1em",
                    }}
                  >
                    #{driver.driverNumber}
                  </span>
                  <img
                    className="driver-flag"
                    src={getFlagUrl(driver.nationality)}
                    alt={driver.nationality}
                    style={{
                      width: 22,
                      height: 16,
                      borderRadius: 2,
                      marginRight: 8,
                      objectFit: "cover",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      verticalAlign: "middle",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span style={{ fontWeight: 600, marginRight: 10 }}>
                    {driver.firstName} {driver.lastName}
                  </span>
                  <span style={{ color: "#b0b3c6", marginRight: 10 }}>
                    ({driver.nationality})
                  </span>
                </div>
                {bestResult && (
                  <div
                    style={{
                      color: "#2af563",
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    Best: P{bestResult.position}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalTeam, setModalTeam] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [teamsRes, driversRes, resultsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/teams"),
          axios.get("http://localhost:8080/api/drivers"),
          axios.get("http://localhost:8080/api/results/all"),
        ]);
        setTeams(Array.isArray(teamsRes.data) ? teamsRes.data : []);
        setDrivers(Array.isArray(driversRes.data) ? driversRes.data : []);
        setResults(Array.isArray(resultsRes.data) ? resultsRes.data : []);
      } catch (err) {
        setTeams([]);
        setDrivers([]);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-widgets loading-container">
        Loading...
      </div>
    );
  }

  if (!teams.length) {
    return (
      <div className="dashboard-widgets loading-container">
        No teams found.
      </div>
    );
  }

  // Helper to get drivers for a team
  const getDriversForTeam = (teamId) =>
    drivers.filter((d) => d.teamId === teamId);

  return (
    <div className="calendar-card">
      <div className="calendar-title">Teams</div>
      <div className="calendar-grid">
        {teams.map((team) => {
          const carImgSrc = `/cars/${(team.name || "unknown")
            .toLowerCase()
            .replace(/ /g, "_")}.png`;
          const teamDrivers = getDriversForTeam(team._id || team.id);

          return (
            <div className="calendar-race" key={team._id || team.id}>
              <div style={{ color: "#fff", marginBottom: 8, fontWeight: 900 }}>
                {team.name}
              </div>
              {/* Car image with gradient overlay */}
              <div style={{ position: "relative", width: "95%", maxWidth: 520 }}>
                <img
                  src={carImgSrc}
                  alt={team.name}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginBottom: "32px",
                    background: "#23284a",
                    objectFit: "contain",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div style={{ color: "#b0b3c6", marginBottom: 8 }}>
                <strong>Team Principal:</strong> {team.teamPrincipal}
              </div>
              <div style={{ color: "#b0b3c6", marginBottom: 8 }}>
                <strong>Technical Chief:</strong> {team.technicalChief}
              </div>
              <div style={{ color: "#b0b3c6", marginBottom: 8 }}>
                <strong>Power Unit:</strong> {team.engineSupplier}
              </div>
              <div style={{ color: "#b0b3c6", marginBottom: 8 }}>
                <strong>First Team Entry:</strong> {team.firstTeamEntry}
              </div>
              <div style={{ color: "#b0b3c6", marginBottom: 8 }}>
                <strong>World Championships:</strong> {team.wc}
              </div>
              <button
                style={{
                  margin: "12px 0 8px 0",
                  background: "#6a5af9",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1em",
                }}
                onClick={() => setModalTeam(team)}
              >
                Show Drivers
              </button>
            </div>
          );
        })}
      </div>
      <DriversModal
        open={!!modalTeam}
        onClose={() => setModalTeam(null)}
        team={modalTeam}
        drivers={
          modalTeam
            ? drivers.filter(
              (d) => d.teamId === (modalTeam._id || modalTeam.id)
            )
            : []
        }
        results={results}
      />
    </div>
  );
}
