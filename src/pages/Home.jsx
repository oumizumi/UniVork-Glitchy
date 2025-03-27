import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        // Here you would typically also change the app's language context
    };

    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="nav-content">
                    <Link to="/" className="nav-logo">UniVork</Link>
                    <div className="nav-center">
                        <Link to="/for-students" className="nav-link">For students</Link>
                        <Link to="/for-employers" className="nav-link">For employers</Link>
                        <Link to="/resources" className="nav-link">Resources</Link>
                    </div>
                    <div className="nav-right">
                        <div className="language-toggle">
                            <span
                                className={language === 'en' ? 'active' : ''}
                                onClick={() => handleLanguageChange('en')}
                            >
                                EN
                            </span>
                            <span className="separator">|</span>
                            <span
                                className={language === 'fr' ? 'active' : ''}
                                onClick={() => handleLanguageChange('fr')}
                            >
                                FR
                            </span>
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
                        <Link to="/for-students" className="info-card">
                            <h2>For Students</h2>
                            <p>Find internships, part-time jobs, and career opportunities that align with your academic journey.</p>
                        </Link>
                        <Link to="/for-employers" className="info-card">
                            <h2>For Employers</h2>
                            <p>Access a pool of talented students and recent graduates ready to contribute to your organization.</p>
                        </Link>
                        <Link to="/resources" className="info-card">
                            <h2>Resources</h2>
                            <p>Access guides, tips, and tools to help you succeed in your career journey.</p>
                        </Link>
                    </div>

                    <Link to="/signup" className="get-started-btn">Get Started Today</Link>
                </div>

                <div className="image-placeholder">
                    748×425
                </div>
            </main>
        </div>
    );
};

export default Home; 