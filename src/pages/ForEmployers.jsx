import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForEmployers.css';

function ForEmployers() {
    const navigate = useNavigate();

    return (
        <div className="employers-page">
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
                        <li onClick={() => navigate('/for-students')} className="nav-item">For students</li>
                        <li className="nav-item active">For employers</li>
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
                    <h1>Find Your Next Great Hire</h1>
                    <p className="subtitle">Connect with talented students and recent graduates</p>

                    <div className="benefits-grid">
                        <div className="benefit-box">
                            <h3>Access Top Talent</h3>
                            <p>Connect with motivated students and recent graduates from top institutions</p>
                            <button onClick={() => navigate('/post-job')} className="action-btn">
                                Post a Job
                            </button>
                        </div>

                        <div className="benefit-box">
                            <h3>Internship Programs</h3>
                            <p>Build your talent pipeline through structured internship programs</p>
                            <button onClick={() => navigate('/create-program')} className="action-btn">
                                Create Program
                            </button>
                        </div>

                        <div className="benefit-box">
                            <h3>Employer Resources</h3>
                            <p>Access tools and best practices for student recruitment</p>
                            <button onClick={() => navigate('/employer-resources')} className="action-btn">
                                View Resources
                            </button>
                        </div>
                    </div>

                    <section className="why-univork">
                        <h2>Why Choose UniVork</h2>
                        <div className="benefits">
                            <div className="benefit">
                                <h3>Quality Candidates</h3>
                                <p>Access pre-screened candidates who match your requirements</p>
                            </div>
                            <div className="benefit">
                                <h3>Easy Management</h3>
                                <p>Streamlined tools to manage applications and communications</p>
                            </div>
                            <div className="benefit">
                                <h3>Cost Effective</h3>
                                <p>Competitive pricing with high ROI for your recruitment needs</p>
                            </div>
                        </div>
                    </section>

                    <section className="cta-section">
                        <h2>Ready to Start Hiring?</h2>
                        <p>Join thousands of employers who trust UniVork for their hiring needs</p>
                        <button onClick={() => navigate('/signup')} className="cta-button">
                            Get Started Now
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ForEmployers; 