import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DriverStandings from "./components/DriverStandings";
import ConstructorStandings from "./components/ConstructorStandings";
import StatsSection from "./components/StatsSection";
import Calendar_component from "./components/Calendar_component";
import RaceResults from "./components/ResultsComponent";
import NextRaces from "./components/NextRaces";
import AdminLoginPage from "./components/AdminLoginPage";
import LogResultsByPosition from "./components/LogResultsByPosition";
import TeamPage from "./components/TeamPage";
import "./App.css";

function Home() {
  return (
    <div className="dashboard-widgets">
      <DriverStandings />
      <div className="help-me">
        <NextRaces />
        <ConstructorStandings />
      </div>
      <StatsSection />
    </div>
  );
}
function Calendar() {
  return (
    <div className="dashboard-widgets">
      <Calendar_component />
    </div>
  );
}
function Teams() {
  return <div className="dashboard-widgets">
    < TeamPage />
  </div>;
}

export default function App() {
  return (
    <Router>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar/results/:raceId" element={<RaceResults />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/log-results/:raceId" element={<LogResultsByPosition />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
