import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const ForStudents = () => {
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
                <div className="student-content">
                    <h1>For Students</h1>
                    <p className="subtitle">Find internships, part-time jobs, and career opportunities that align with your academic journey.</p>

                    <div className="employer-features">
                        <div className="feature-card">
                            <h2>Find Opportunities</h2>
                            <p>Discover internships and job opportunities that match your skills and interests.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Build Your Profile</h2>
                            <p>Create a compelling profile that showcases your skills and experiences to potential employers.</p>
                        </div>

                        <div className="feature-card">
                            <h2>Develop Your Skills</h2>
                            <p>Access resources and guidance to help you develop the skills employers are looking for.</p>
                        </div>
                    </div>

                    <Link to="/signup" className="get-started-btn">Get Started Today</Link>
                </div>
            </main>
        </div>
    );
};

export default ForStudents; 