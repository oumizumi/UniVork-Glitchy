import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForStudents.css';

function ForStudents() {
    const navigate = useNavigate();

    return (
        <div className="students-page">
            <header className="header">
                <div
                    className="logo"
                    onClick={() => navigate('/')}
                    aria-label="Go to home"
                >
                    UniVork
                </div>
                <nav className="nav">
                    <ul>
                        <li className="nav-item active">For students</li>
                        <li onClick={() => navigate('/for-employers')} className="nav-item">For employers</li>
                        <li onClick={() => navigate('/resources')} className="nav-item">Resources</li>
                    </ul>
                </nav>
                <div className="auth">
                    <button className="login" onClick={() => navigate('/login')}>
                        Log in
                    </button>
                    <button className="signup" onClick={() => navigate('/signup')}>
                        Sign up
                    </button>
                </div>
            </header>
            <main className="main">
                <div className="content">
                    <h1>Start Your Career Journey</h1>
                    <p className="subtitle">Find opportunities that match your skills and ambitions</p>

                    <div className="features-grid">
                        <div className="feature-box">
                            <h3>Internships</h3>
                            <p>Gain valuable work experience through internships at leading companies</p>
                            <button onClick={() => navigate('/internships')} className="explore-btn">
                                Explore Internships
                            </button>
                        </div>

                        <div className="feature-box">
                            <h3>Part-Time Jobs</h3>
                            <p>Find flexible work opportunities that fit your schedule</p>
                            <button onClick={() => navigate('/part-time')} className="explore-btn">
                                View Opportunities
                            </button>
                        </div>

                        <div className="feature-box">
                            <h3>Career Resources</h3>
                            <p>Access tools and guidance to help you succeed</p>
                            <button onClick={() => navigate('/career-resources')} className="explore-btn">
                                Access Resources
                            </button>
                        </div>
                    </div>

                    <section className="how-it-works">
                        <h2>How It Works</h2>
                        <div className="steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <h3>Create Your Profile</h3>
                                <p>Build your professional profile highlighting your skills and experience</p>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <h3>Explore Opportunities</h3>
                                <p>Browse through curated opportunities matching your interests</p>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <h3>Apply & Connect</h3>
                                <p>Apply to positions and connect directly with employers</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ForStudents; 