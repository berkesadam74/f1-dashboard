import React, { useEffect, useState } from "react";
import StatBarChart from "./StatBarChart";
import axios from "axios";
import "./StatsSection.css";

export default function StatsSection() {
  const [raceWins, setRaceWins] = useState([]);
  const [polePositions, setPolePositions] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [podiums, setPodiums] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/stats/race-wins?season=2025").then(res => setRaceWins(res.data));
    axios.get("http://localhost:8080/api/stats/pole-positions?season=2025").then(res => setPolePositions(res.data));
    axios.get("http://localhost:8080/api/stats/fastest-laps?season=2025").then(res => setFastestLaps(res.data));
    axios.get("http://localhost:8080/api/stats/podiums?season=2025").then(res => setPodiums(res.data));
  }, []);

  return (
    <div className="stats-section">
      <StatBarChart data={raceWins} title="Race wins" color="#f857a6" />
      <StatBarChart data={polePositions} title="Pole positions" color="#a6b6f9" />
      <StatBarChart data={fastestLaps} title="Fastest laps" color="#6a5af9" />
      <StatBarChart data={podiums} title="Podiums" color="#f8b857" />
    </div>
  );
}
