import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Resources = () => {
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

            <main className="page-content">
                <div className="resources-content">
                    <h1>Resources</h1>
                    <p className="subtitle">Access guides, tips, and tools to help you succeed in your career journey.</p>

                    <div className="employer-features">
                        <div className="feature-card">
                            <h2>Career Guides</h2>
                            <p>Access comprehensive guides to help you navigate your career path successfully.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Interview Prep</h2>
                            <p>Prepare for interviews with tips, common questions, and best practices.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Resume Building</h2>
                            <p>Learn how to create a resume that stands out to potential employers.</p>
                        </div>
                    </div>

                    <Link to="/resources/explore" className="get-started-btn">Explore Resources</Link>
                </div>
            </main>
        </div>
    );
};

export default Resources; 