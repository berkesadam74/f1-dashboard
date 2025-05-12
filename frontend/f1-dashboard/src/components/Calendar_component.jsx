import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Calendar_component.css";

export default function Calendar() {
  const [races, setRaces] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check admin status on component mount and whenever localStorage might change
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    checkAdminStatus();
    window.addEventListener('storage', checkAdminStatus);

    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/api/races?season=2025"),
      axios.get("http://localhost:8080/api/circuits"),
    ])
      .then(([racesRes, circuitsRes]) => {
        setRaces(Array.isArray(racesRes.data) ? racesRes.data : []);
        setCircuits(Array.isArray(circuitsRes.data) ? circuitsRes.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch races or circuits:", error);
        setLoading(false);
      });
  }, []);

  // Fetch all results for all races
  useEffect(() => {
    axios.get("http://localhost:8080/api/results/all")
      .then(res => {
        setAllResults(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setAllResults([]));
  }, []);

  const getCircuit = (circuitId) =>
    circuits.find(
      (c) =>
        c.id === circuitId ||
        c._id === circuitId ||
        (typeof circuitId === "string" && (c.id === circuitId || c._id === circuitId)) ||
        (typeof circuitId === "object" && (c.id === circuitId?.toString() || c._id === circuitId?.toString()))
    );

  // Helper: does this race have any results?
  const hasResults = (raceId) =>
    allResults.some(
      (r) =>
        r.raceId === raceId ||
        r.raceId === (raceId?._id || raceId)
    );

  if (loading) return <div className="calendar-card">Loading...</div>;

  return (
    <div className="calendar-card">
      <div className="calendar-title">Race Calendar</div>
      <div className="calendar-grid">
        {(Array.isArray(races) ? races : []).map((race) => {
          const circuit = getCircuit(race.circuitId);
          return (
            <div className="calendar-race" key={race.id || race._id}>
              <div className="calendar-race-header">
                <span className="calendar-flag">
                  <img
                    src={`/flags/${(circuit?.country || "unknown")
                      .toLowerCase()
                      .replace(/ /g, "_")}.svg`}
                    alt={circuit?.country}
                    className="calendar-flag-img"
                  />
                </span>
                <span className="calendar-race-name">{race.raceName}</span>
                <span className="calendar-date">
                  {race.raceDate
                    ? new Date(race.raceDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })
                    : ""}
                </span>
              </div>
              <div className="calendar-circuit-name">{circuit?.circuitName}</div>
              <div className="calendar-circuit-map">
                <img
                  src={`/circuits/${(circuit?.circuitName || "unknown")
                    .toLowerCase()
                    .replace(/ /g, "_")}.png`}
                  alt={circuit?.circuitName}
                  className="calendar-circuit-img"
                />
              </div>
              <div className="calendar-actions">
                {isAdmin && (
                  <button
                    className="calendar-btn log-btn"
                    onClick={() =>
                      navigate(`/admin/log-results/${race.id}`, {
                        state: { race: race },
                      })
                    }
                  >
                    Log
                  </button>
                )}
                {hasResults(race.id) && (
                  <button
                    className="calendar-btn results-btn"
                    onClick={() =>
                      navigate(`/calendar/results/${race.id}`, {
                        state: {
                          race,
                          circuit: circuit || null,
                        },
                      })
                    }
                  >
                    Results
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
