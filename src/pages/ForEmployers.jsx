import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const ForEmployers = () => {
    const navigate = useNavigate();
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
                <div className="employer-content">
                    <h1>For Employers</h1>
                    <p className="subtitle">Connect with talented students and recent graduates who are ready to contribute to your organization.</p>

                    <div className="employer-features">
                        <div className="feature-card">
                            <h2>Access Top Talent</h2>
                            <p>Connect with motivated students and recent graduates from top institutions.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Streamlined Recruitment</h2>
                            <p>Our platform makes it easy to post opportunities and manage applications.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Build Your Brand</h2>
                            <p>Establish your employer brand among the next generation of professionals.</p>
                        </div>
                    </div>

                    <Link to="/signup/employer" className="get-started-btn">Get Started Today</Link>
                </div>
            </main>
        </div>
    );
};

export default ForEmployers; 