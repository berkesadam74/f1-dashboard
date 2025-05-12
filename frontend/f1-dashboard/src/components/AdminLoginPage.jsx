import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css'; // Create this CSS file

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simple hardcoded password for the school project (replace with real auth if needed)
  const ADMIN_PASSWORD = 'admin'; // Replace with your desired password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      // Store a flag in localStorage or state that the user is admin
      localStorage.setItem('isAdmin', 'true');
      navigate('/calendar'); // Redirect to calendar after login (or where you want)
      window.location.reload(); // Refresh the page
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className='dashboard-widgets'>
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        {error && <div className="login-error">{error}</div>}
        <div className="login-form">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
