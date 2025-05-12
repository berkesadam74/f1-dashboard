import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './LogResultsPage.css';

// Helper function to calculate points based on position
const calculatePoints = (position) => {
  if (position <= 0) return 0;
  const pointsMap = {
    1: 25, 2: 18, 3: 15, 4: 12, 5: 10,
    6: 8, 7: 6, 8: 4, 9: 2, 10: 1,
  };
  return pointsMap[position] || 0;
};

// Helper to convert time string (like "1:30.123") to milliseconds for comparison
const timeToMilliseconds = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return Infinity;
  const parts = timeStr.split(':');
  let totalMilliseconds = 0;
  if (parts.length === 3) { // HH:mm:ss.SSS
    const [h, m, sMs] = parts;
    const [s, ms] = sMs.split('.');
    totalMilliseconds = (parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)) * 1000 + parseInt(ms || '0');
  } else if (parts.length === 2) { // mm:ss.SSS
    const [m, sMs] = parts;
    const [s, ms] = sMs.split('.');
    totalMilliseconds = (parseInt(m) * 60 + parseInt(s)) * 1000 + parseInt(ms || '0');
  } else if (parts.length === 1) { // ss.SSS or just SSS
    const [sMs] = parts;
    const [s, ms] = sMs.split('.');
    totalMilliseconds = (parseInt(s || '0')) * 1000 + parseInt(ms || '0');
  }
  return totalMilliseconds;
};


export default function LogResultsPage() {
  const { raceId } = useParams();
  const navigate = useNavigate();

  const [race, setRace] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [driverResults, setDriverResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // State for delete
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const raceRes = await axios.get(`http://localhost:8080/api/races/${raceId}`);
        setRace(raceRes.data);

        const [driversRes, existingResultsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/drivers"),
          axios.get(`http://localhost:8080/api/results?raceId=${raceId}`)
        ]);

        const driverList = Array.isArray(driversRes.data) ? driversRes.data : [];
        setDrivers(driverList);
        const existingResults = Array.isArray(existingResultsRes.data) ? existingResultsRes.data : [];

        const initialResults = driverList.map(driver => {
          const existing = existingResults.find(res => res.driverId === driver.id);
          if (existing) {
            // Ensure fastestLap is an object or null, initialize rank if needed
            return {
              ...existing,
              fastestLap: existing.fastestLap || { rank: 0, lapNumber: 0, time: '' }
            };
          } else {
            return {
              raceId: raceId,
              driverId: driver.id,
              teamId: driver.teamId,
              position: 0,
              gridPosition: 0,
              laps: 0,
              status: "Finished",
              fastestLap: { rank: 0, lapNumber: 0, time: '' },
              totalRaceTime: null,
              points: 0,
              createdAt: new Date().toISOString(),
            };
          }
        });

        setDriverResults(initialResults);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data.");
        setLoading(false);
        setResults([]); // Ensure results is an empty array on error
        setRace(null);
      }
    };

    fetchData();
  }, [raceId, navigate]);

  const handleInputChange = (driverId, field, value) => {
    setDriverResults(prevResults =>
      prevResults.map(result =>
        result.driverId === driverId ? { ...result, [field]: value } : result
      )
    );
  };

  const handleFastestLapChange = (driverId, field, value) => {
    setDriverResults(prevResults =>
      prevResults.map(result => {
        if (result.driverId === driverId) {
          const updatedFastestLap = { ...(result.fastestLap || {}), [field]: value };
          return { ...result, fastestLap: updatedFastestLap };
        }
        return result;
      })
    );
  };

  // Function to calculate fastest lap ranks
  const calculateFastestLapRanks = (results) => {
    // Filter out results without a fastest lap time
    const resultsWithTimes = results.filter(r => r.fastestLap?.time);

    // Sort by fastest lap time (ascending)
    const sortedByTime = [...resultsWithTimes].sort((a, b) =>
      timeToMilliseconds(a.fastestLap.time) - timeToMilliseconds(b.fastestLap.time)
    );

    // Assign ranks
    const rankedResults = sortedByTime.map((result, index) => ({
      ...result,
      fastestLap: {
        ...result.fastestLap,
        rank: index + 1 // Rank is 1-based
      }
    }));

    // Merge ranks back into the original results list (including those without times)
    const finalResults = results.map(result => {
      const ranked = rankedResults.find(r => r.driverId === result.driverId);
      return ranked ? ranked : result; // Use ranked if found, otherwise original
    });

    return finalResults;
  };


  const handleSave = () => {
    setSaving(true);
    setError(null);

    // 1. Calculate Fastest Lap Ranks
    const resultsWithRanks = calculateFastestLapRanks(driverResults);

    // 2. Calculate Points and prepare for saving
    const resultsToSave = resultsWithRanks.map(result => ({
      ...result,
      points: calculatePoints(result.position),
      // Ensure fastestLap is null if time is empty, otherwise send the object
      fastestLap: (result.fastestLap?.time) ? result.fastestLap : null,
      // Use the existing createdAt if it's there, otherwise set a new date
      createdAt: result.createdAt || new Date().toISOString(),
      // Add or update 'id' if it exists (for updating existing results)
      ...(result.id && { id: result.id })
    }));


    console.log("Saving results:", resultsToSave); // Debug log

    // Determine if creating new or updating existing
    const isUpdating = resultsToSave.some(result => result.id);

    const savePromise = isUpdating
      ? axios.put("http://localhost:8080/api/results", resultsToSave) // Assuming PUT for update
      : axios.post("http://localhost:8080/api/results", resultsToSave); // POST for create

    savePromise
      .then(() => {
        setSaving(false);
        navigate(`/calendar/results/${raceId}`);
      })
      .catch(err => {
        console.error("Failed to save results:", err);
        setError(`Failed to save results: ${err.message}. Please try again.`);
        setSaving(false);
      });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all results for this race?");
    if (!confirmDelete) return;

    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8080/api/results/${raceId}`);
      setDeleting(false);
      // Optionally navigate back or show a success message
      navigate(`/calendar`); // Navigate back to calendar after deleting
    } catch (err) {
      console.error("Failed to delete results:", err);
      setError(`Failed to delete results: ${err.message}. Please try again.`);
      setDeleting(false);
    }
  };


  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? `${driver.firstName} ${driver.lastName}` : "Unknown Driver";
  }

  if (loading || !race) return <div className="log-results-page">Loading...</div>;
  if (error && !loading) return <div className="log-results-page">{error}</div>;

  return (
    <div className="dashboard-widgets"> {/* Keep this container */}
      <div className="results-overview-card">
        <button className="results-back" onClick={() => navigate(-1)}>← Back</button>
        <span className="log-results-title">Log Results for {race.raceName}</span>
      </div>

      <div className="log-results-page"> {/* Content area for the form */}
        <div className="results-entry-grid">
          {driverResults.map(result => (
            <div className="driver-result-entry" key={result.driverId}>
              <span className="driver-name-label">{getDriverName(result.driverId)}</span>
              <div className="result-fields">
                {/* --- Position --- */}
                <label>Pos:</label>
                <input
                  type="number"
                  value={result.position || ''} // Use || '' for number inputs to avoid React warning
                  onChange={e => handleInputChange(result.driverId, 'position', parseInt(e.target.value) || 0)}
                />

                {/* --- Grid Position --- */}
                <label>Grid:</label>
                <input
                  type="number"
                  value={result.gridPosition || ''}
                  onChange={e => handleInputChange(result.driverId, 'gridPosition', parseInt(e.target.value) || 0)}
                />


                {/* --- Status --- */}
                <label>Status:</label>
                <input
                  type="text"
                  value={result.status || ''}
                  onChange={e => handleInputChange(result.driverId, 'status', e.target.value)}
                />

                {/* --- Total Race Time --- */}
                <label>Time:</label>
                <input
                  type="text"
                  value={result.totalRaceTime || ''}
                  onChange={e => handleInputChange(result.driverId, 'totalRaceTime', e.target.value)}
                />

                {/* --- Fastest Lap Fields --- */}
                <label>FL Time:</label>
                <input
                  type="text"
                  value={result.fastestLap?.time || ''} // Use ?. for optional chaining
                  onChange={e => handleFastestLapChange(result.driverId, 'time', e.target.value)}
                />
                {/* Display calculated rank, not input */}
                <label>FL Rank:</label>
                <span className="fastest-lap-rank-display">
                  {result.fastestLap?.rank > 0 ? result.fastestLap.rank : '-'}
                </span>


                {/* --- Points (Calculated, maybe display read-only) --- */}
                <label>Points:</label>
                <input
                  type="number"
                  value={calculatePoints(result.position)}
                  readOnly
                  className="points-display"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="log-results-actions">
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Results'}
          </button>
          <button onClick={handleDelete} disabled={deleting} className="delete-button">
            {deleting ? 'Deleting...' : 'Delete Results'}
          </button>
        </div>
      </div>
    </div>

  );
}
