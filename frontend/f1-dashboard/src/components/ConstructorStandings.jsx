import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConstructorStandings.css";

const TEAM_BG_COLORS = {
  "Mercedes AMG Petronas": "#00d2be",
  "Oracle Red Bull Racing": "#1e41ff",
  "Scuderia Ferrari": "#dc0000",
  "McLaren Mercedes": "#ff8700",
  "Aston Martin Aramco Cognizant F1 Team": "#006f62",
  "Haas F1 Team": "#b6babd",
  "Alpine F1 Team": "#2293d1",
  "Williams Racing": "#00a3e0",
  "Visa Cash App RB": "#6692ff",
  "Kick Sauber F1 Team": "#52e252",
};

const getTeamLogoUrl = (teamName) =>
  `/teams/${teamName.toLowerCase().replace(/ /g, "_")}.png`;

const API_URL = "http://localhost:8080/api/standings/constructors?season=2025";

export default function ConstructorStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setStandings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="constructors-card">Loading...</div>;

  return (
    <div className="constructors-card">
      <div className="constructors-title">Constructors standings</div>
      <table className="constructors-table">
        <tbody>
          {standings.map((team) => (
            <tr key={team.teamId}>
              <td colSpan={2} style={{ padding: 0, border: "none" }}>
                <div
                  className="constructor-bg-row"
                  style={{
                    background: `linear-gradient(90deg, ${TEAM_BG_COLORS[team.teamName] || "#23284a"} 0%, rgba(35,40,74,0) 99%)`,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 12px",
                  }}
                >
                  <div className="constructor-row" style={{ flex: 1 }}>
                    <img
                      className="constructor-logo"
                      src={getTeamLogoUrl(team.teamName)}
                      alt={team.teamName}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <span className="constructor-name">{team.teamName}</span>
                  </div>
                  <div className="constructor-points">{team.points}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
