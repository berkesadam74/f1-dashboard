import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdHome, MdCalendarToday, MdMap, MdPerson, MdGroup, MdBarChart, MdLogout, MdLogin } from "react-icons/md"; // Import MdLogin icon
import "./Sidebar.css";

const menu = [
  { icon: <MdHome />, label: "Home", path: "/" },
  { icon: <MdCalendarToday />, label: "Calendar", path: "/calendar" },
  // { icon: <MdMap />, label: "Tracks", path: "/tracks" },
  // { icon: <MdPerson />, label: "Drivers", path: "/drivers" },
  { icon: <MdGroup />, label: "Teams", path: "/teams" },
  // { icon: <MdBarChart />, label: "Analysis", path: "/analysis" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home"); // Keep for visual highlighting
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  // Check admin status on component mount and listen for changes
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    checkAdminStatus(); // Initial check

    // Listen for changes in localStorage (e.g., from login/logout page)
    window.addEventListener('storage', checkAdminStatus);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); // Remove the admin flag
    window.location.reload(); // Refresh the page
  };

  const handleLoginClick = () => {
    navigate('/admin'); // Navigate to the login page
  };


  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img src="/f1.png" alt="F1 Logo" height={30} />
      </div>
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              "sidebar-item" + (isActive ? " active" : "")
            }
            end={item.path === "/"}
            onClick={() => setActive(item.label)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}

        {isAdmin ? (
          <li className="sidebar-item logout-item" onClick={handleLogout}>
            <span className="sidebar-icon"><MdLogout /></span>
            <span className="sidebar-label">Logout</span>
          </li>
        ) : (
          <li className="sidebar-item login-item" onClick={handleLoginClick}>
            <span className="sidebar-icon"><MdLogin /></span>
            <span className="sidebar-label">Login</span>
          </li>
        )}
      </ul>
    </div>
  );
}
