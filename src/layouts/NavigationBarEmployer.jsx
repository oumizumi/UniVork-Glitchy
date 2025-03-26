import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavigationBarEmployer.css';

const NavigationBarEmployer = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="dashboard-nav">
            <div className="nav-content">
                <Link to="/employer-dashboard" className="nav-logo">
                    UniVork
                </Link>
                <div className="nav-links">
                    <Link to="/employer-dashboard">Dashboard</Link>
                    <Link to="/employer-dashboard/post-job">Post Job</Link>
                    <Link to="/employer-dashboard/applications">Applications</Link>
                    <Link to="/employer-dashboard/profile">Profile</Link>
                    <button onClick={handleLogout} className="nav-button">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBarEmployer; 