import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavigationBarStudent.css';

const NavigationBarStudent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-content">
        <Link to="/studentdashboard" className="nav-logo">
          UniVork
        </Link>
        <div className="nav-links">
          <Link to="/studentdashboard">Dashboard</Link>
          <Link to="/studentdashboard/jobs">Jobs</Link>
          <Link to="/studentdashboard/applications">Applications</Link>
          <Link to="/studentdashboard/profile">Profile</Link>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBarStudent;
