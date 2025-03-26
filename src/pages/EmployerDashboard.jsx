import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployerDashboard.css';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const [showJobPostings, setShowJobPostings] = useState(true);
    const [showApplications, setShowApplications] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleMenuItemClick = (item) => {
        setShowJobPostings(false);
        setShowApplications(false);
        setShowAnalytics(false);
        setShowSettings(false);

        switch (item) {
            case 'postings':
                setShowJobPostings(true);
                break;
            case 'applications':
                setShowApplications(true);
                break;
            case 'analytics':
                setShowAnalytics(true);
                break;
            case 'settings':
                setShowSettings(true);
                break;
            default:
                setShowJobPostings(true);
                break;
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <div
                        className="nav-logo"
                        onClick={handleLogoClick}
                        role="button"
                        aria-label="Go to home page"
                    >
                        UniVork
                    </div>
                </div>
                <div className="nav-right">
                    <div className="nav-icons">
                        <div className="nav-icon">
                            <span className="material-icons-round">mail</span>
                            <span className="badge">3</span>
                        </div>
                        <div className="nav-icon">
                            <span className="material-icons-round">notifications</span>
                            <span className="badge">5</span>
                        </div>
                        <div className="nav-icon profile">
                            <span className="material-icons-round">account_circle</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <div className="sidebar-menu">
                        <div
                            className={`menu-item ${showJobPostings ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('postings')}
                        >
                            <span className="material-icons-round">work</span>
                            Job Postings
                        </div>
                        <div
                            className={`menu-item ${showApplications ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('applications')}
                        >
                            <span className="material-icons-round">description</span>
                            Applications
                        </div>
                        <div
                            className={`menu-item ${showAnalytics ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('analytics')}
                        >
                            <span className="material-icons-round">analytics</span>
                            Analytics
                        </div>
                        <div
                            className={`menu-item ${showSettings ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick('settings')}
                        >
                            <span className="material-icons-round">settings</span>
                            Settings
                        </div>
                    </div>
                </div>

                <div className="dashboard-main">
                    {showJobPostings && (
                        <div className="job-postings-section">
                            <h2>Job Postings</h2>
                            <button className="post-job-btn">
                                <span className="material-icons-round">add</span>
                                Post New Job
                            </button>
                            <div className="job-list">
                                {/* Job postings will be listed here */}
                            </div>
                        </div>
                    )}

                    {showApplications && (
                        <div className="applications-section">
                            <h2>Applications</h2>
                            <div className="applications-list">
                                {/* Applications will be listed here */}
                            </div>
                        </div>
                    )}

                    {showAnalytics && (
                        <div className="analytics-section">
                            <h2>Analytics</h2>
                            <div className="analytics-grid">
                                {/* Analytics widgets will be displayed here */}
                            </div>
                        </div>
                    )}

                    {showSettings && (
                        <div className="settings-section">
                            <h2>Settings</h2>
                            <div className="settings-form">
                                {/* Settings form will be here */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard; 