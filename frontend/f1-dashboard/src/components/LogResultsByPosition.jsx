import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./LogResultsByPosition.css";

const calculatePoints = (position) => {
  if (position <= 0 || position > 10) return 0;
  const pointsMap = {
    1: 25,
    2: 18,
    3: 15,
    4: 12,
    5: 10,
    6: 8,
    7: 6,
    8: 4,
    9: 2,
    10: 1,
  };
  return pointsMap[position] || 0;
};

const timeToMilliseconds = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return Infinity;
  const parts = timeStr.split(":");
  let totalMilliseconds = 0;
  if (parts.length === 2) {
    const [m, sMs] = parts;
    const [s, ms] = sMs.split(".");
    totalMilliseconds =
      parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms || "0");
  } else if (parts.length === 1 && timeStr.includes(".")) {
    const [s, ms] = timeStr.split(".");
    totalMilliseconds = parseInt(s || "0") * 1000 + parseInt(ms || "0");
  } else {
    return Infinity;
  }
  return totalMilliseconds;
};

export default function LogResultsByPosition() {
  const { raceId } = useParams();
  const navigate = useNavigate();

  const [race, setRace] = useState(null);
  const [allDrivers, setAllDrivers] = useState([]);
  const [resultsByPosition, setResultsByPosition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/admin");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [raceRes, driversRes, existingResultsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/races/${raceId}`),
          axios.get("http://localhost:8080/api/drivers"),
          axios.get(`http://localhost:8080/api/results?raceId=${raceId}`),
        ]);

        setRace(raceRes.data);
        const driverList = Array.isArray(driversRes.data)
          ? driversRes.data
          : [];
        setAllDrivers(driverList);
        const existingResults = Array.isArray(existingResultsRes.data)
          ? existingResultsRes.data
          : [];

        const prefilledResults = existingResults.map((res) => ({
          ...res,
          fastestLap: res.fastestLap || { rank: 0, time: "" },
        }));
        setResultsByPosition(prefilledResults);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [raceId, navigate]);

  const getAvailableDrivers = useCallback(() => {
    const assignedDriverIds = resultsByPosition
      .map((r) => r.driverId)
      .filter((id) => id !== null);
    return allDrivers.filter((d) => !assignedDriverIds.includes(d.id));
  }, [allDrivers, resultsByPosition]);

  const handleInputChange = (position, field, value, driverId) => {
    setResultsByPosition((prev) =>
      prev.map((res) => {
        const isMatch =
          position === -1
            ? res.position === -1 && res.driverId === driverId
            : res.position === position;
        if (isMatch) {
          if (field === "driverId") {
            const selectedDriver = allDrivers.find((d) => d.id === value);
            return {
              ...res,
              [field]: value,
              teamId: selectedDriver?.teamId || null,
            };
          }
          if (field === "fastestLapTime") {
            const updatedFastestLap = {
              ...(res.fastestLap || {}),
              time: value,
            };
            return { ...res, fastestLap: updatedFastestLap };
          }
          if (field === "status" && value === "DNF") {
            return { ...res, status: value, totalRaceTime: "" };
          }
          return { ...res, [field]: value };
        }
        return res;
      })
    );
  };

  const handleAddDNF = () => {
    setResultsByPosition((prev) => [
      ...prev,
      {
        position: -1,
        driverId: null,
        teamId: null,
        gridPosition: 0,
        status: "DNF",
        fastestLap: { rank: 0, time: "" },
        totalRaceTime: "",
        points: 0,
        createdAt: new Date().toISOString(),
        raceId: raceId,
      },
    ]);
  };

  const handleAddPosition = () => {
    const usedPositions = resultsByPosition
      .filter((r) => r.position > 0)
      .map((r) => r.position);
    const nextPos = Array.from({ length: 20 }, (_, i) => i + 1).find(
      (pos) => !usedPositions.includes(pos)
    );
    if (!nextPos) return;

    setResultsByPosition((prev) => [
      ...prev,
      {
        position: nextPos,
        driverId: null,
        teamId: null,
        gridPosition: 0,
        status: "N/A",
        fastestLap: { rank: 0, time: "" },
        totalRaceTime: "",
        points: 0,
        createdAt: new Date().toISOString(),
        raceId: raceId,
      },
    ]);
  };

  const handleDeletePosition = (position, driverId) => {
    setResultsByPosition((prev) =>
      prev.filter((res) =>
        position === -1
          ? !(res.position === -1 && res.driverId === driverId)
          : res.position !== position
      )
    );
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);

    const filledResults = resultsByPosition.filter((r) => r.driverId !== null);

    const resultsWithTimes = filledResults.filter((r) => r.fastestLap?.time);
    const sortedByTime = [...resultsWithTimes].sort(
      (a, b) =>
        timeToMilliseconds(a.fastestLap.time) -
        timeToMilliseconds(b.fastestLap.time)
    );
    const rankedResults = sortedByTime.map((result, index) => ({
      ...result,
      fastestLap: { ...result.fastestLap, rank: index + 1 },
    }));

    const resultsToSave = filledResults.map((result) => {
      const ranked = rankedResults.find((r) => r.driverId === result.driverId);
      const finalFastestLap = ranked
        ? ranked.fastestLap
        : result.fastestLap?.time
          ? { ...result.fastestLap, rank: 0 }
          : null;

      const totalRaceTime =
        result.totalRaceTime && result.totalRaceTime.trim() !== ""
          ? result.totalRaceTime
          : null;

      return {
        ...result,
        totalRaceTime,
        points: result.position > 0 ? calculatePoints(result.position) : 0,
        fastestLap: finalFastestLap,
        ...(result.id && { id: result.id }),
      };
    });

    axios
      .post("http://localhost:8080/api/results", resultsToSave)
      .then(() => {
        setSaving(false);
        navigate(`/calendar/results/${raceId}`);
      })
      .catch((err) => {
        setError(`Failed to save results: ${err.message}. Please try again.`);
        setSaving(false);
      });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all results for this race? This cannot be undone."
    );
    if (!confirmDelete) return;

    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8080/api/results/${raceId}`);
      setDeleting(false);
      setResultsByPosition([]);
      alert("Results deleted successfully.");
    } catch (err) {
      setError(`Failed to delete results: ${err.message}. Please try again.`);
      setDeleting(false);
    }
  };

  if (loading || !race)
    return <div className="log-results-page">Loading...</div>;
  if (error && !loading)
    return <div className="log-results-page">{error}</div>;

  const availableDrivers = getAvailableDrivers();

  return (
    <div className="dashboard-widgets">
      <div className="results-overview-card">
        <button className="results-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span className="log-results-title">
          Log Results for {race.raceName}
        </span>
      </div>

      <div className="log-results-header-actions">
        <button
          type="button"
          className="add-dnf-button"
          onClick={handleAddPosition}
        >
          + Create New Position
        </button>
        <button
          type="button"
          className="add-dnf-button"
          onClick={handleAddDNF}
        >
          + Add DNF Driver
        </button>
        <button onClick={handleSave} disabled={saving || loading} className="save-button">
          {saving ? "Saving..." : "Save All Results"}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting || loading}
          className="delete-button"
        >
          {deleting ? "Deleting..." : "Delete Race Results"}
        </button>
      </div>

      <div className="log-results-page">
        <div className="results-by-position-grid">
          {resultsByPosition.map((result, idx) => (
            <div
              className="position-entry-card"
              key={
                result.position === -1
                  ? `dnf-${result.driverId || idx}`
                  : result.position
              }
            >
              <button
                type="button"
                style={{
                  alignSelf: "flex-end",
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 8,
                  marginTop: -8,
                }}
                onClick={() =>
                  handleDeletePosition(result.position, result.driverId)
                }
                title="Delete this position"
              >
                ×
              </button>
              <span className="position-number">
                {result.position === -1 ? "DNF" : result.position}
              </span>
              <div className="position-fields">
                <label>Driver:</label>
                <select
                  value={result.driverId || ""}
                  onChange={(e) =>
                    handleInputChange(
                      result.position,
                      "driverId",
                      e.target.value || null,
                      result.driverId
                    )
                  }
                >
                  <option value="">-- Select Driver --</option>
                  {result.driverId &&
                    allDrivers.find((d) => d.id === result.driverId) && (
                      <option value={result.driverId}>
                        {
                          allDrivers.find((d) => d.id === result.driverId)
                            ?.lastName
                        }
                      </option>
                    )}
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.lastName}, {driver.firstName}
                    </option>
                  ))}
                </select>

                <label>Grid:</label>
                <input
                  type="number"
                  value={result.gridPosition || ""}
                  onChange={(e) =>
                    handleInputChange(
                      result.position,
                      "gridPosition",
                      parseInt(e.target.value) || 0,
                      result.driverId
                    )
                  }
                  disabled={!result.driverId}
                />

                <label>Status:</label>
                <select
                  value={result.status || ""}
                  onChange={(e) =>
                    handleInputChange(
                      result.position,
                      "status",
                      e.target.value,
                      result.driverId
                    )
                  }
                  disabled={!result.driverId}
                >
                  <option value="">-- Select Status --</option>
                  <option value="Finished">Finished</option>
                  <option value="Accident">Accident</option>
                  <option value="Retired">Retired</option>
                </select>

                <label>
                  {result.position === 1
                    ? "Total Race Time"
                    : "Gap to Winner"}
                </label>
                <input
                  type="text"
                  placeholder={
                    result.position === 1
                      ? "hh:mm:ss.SSS"
                      : result.position === -1
                        ? "leave blank for DNF"
                        : "+0.500"
                  }
                  value={result.totalRaceTime || ""}
                  onChange={(e) =>
                    handleInputChange(
                      result.position,
                      "totalRaceTime",
                      e.target.value,
                      result.driverId
                    )
                  }
                  disabled={
                    !result.driverId || result.status === "DNF"
                  }
                />

                <label>FL Time:</label>
                <input
                  type="text"
                  placeholder="m:ss.SSS"
                  value={result.fastestLap?.time || ""}
                  onChange={(e) =>
                    handleInputChange(
                      result.position,
                      "fastestLapTime",
                      e.target.value,
                      result.driverId
                    )
                  }
                  disabled={!result.driverId}
                />

                <label>Points:</label>
                <span className="points-display">
                  {result.position > 0
                    ? calculatePoints(result.position)
                    : 0}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div >
  );
}
