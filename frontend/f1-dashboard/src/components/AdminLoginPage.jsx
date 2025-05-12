import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'admin';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/calendar');
      window.location.reload();
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
