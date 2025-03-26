import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="nav-content">
                    <Link to="/" className="nav-logo">UniVork</Link>
                    <div className="nav-center">
                        <Link to="/for-students">For students</Link>
                        <Link to="/for-employers">For employers</Link>
                        <Link to="/resources">Resources</Link>
                    </div>
                    <div className="nav-right">
                        <div className="language-toggle">
                            <span className="active">EN</span>
                            <span className="separator">|</span>
                            <span>FR</span>
                        </div>
                        <div className="auth-buttons">
                            <Link to="/login" className="login-btn">Log in</Link>
                            <Link to="/signup" className="signup-btn">Sign up</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="landing-main">
                <div className="content-section">
                    <h1>Connect with<br />Opportunity</h1>
                    <p className="subtitle">
                        UniVork bridges the gap between students and employers, creating
                        meaningful connections that shape careers and drive innovation.
                    </p>

                    <div className="cards-grid">
                        <div className="info-card">
                            <h2>For Students</h2>
                            <p>Find internships, part-time jobs, and career opportunities that align with your academic journey.</p>
                        </div>
                        <div className="info-card">
                            <h2>For Employers</h2>
                            <p>Access a pool of talented students and recent graduates ready to contribute to your organization.</p>
                        </div>
                        <div className="info-card">
                            <h2>Resources</h2>
                            <p>Access guides, tips, and tools to help you succeed in your career journey.</p>
                        </div>
                    </div>

                    <Link to="/signup" className="get-started-btn">Get Started Today</Link>
                </div>

                <div className="image-placeholder">
                    {/* Placeholder for 748x475 image */}
                </div>
            </main>
        </div>
    );
};

export default Home; 