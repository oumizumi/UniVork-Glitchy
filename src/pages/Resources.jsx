import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Resources.css';

function Resources() {
    const navigate = useNavigate();

    return (
        <div className="resources-page">
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
                        <li onClick={() => navigate('/for-employers')} className="nav-item">For employers</li>
                        <li className="nav-item active">Resources</li>
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
                    <h1>Career Resources</h1>
                    <p className="subtitle">Tools and guides to help you succeed in your career journey</p>

                    <div className="resources-grid">
                        <div className="resource-box">
                            <h3>Resume Building</h3>
                            <p>Learn how to create a compelling resume that stands out to employers</p>
                            <ul className="resource-list">
                                <li>Resume templates</li>
                                <li>Writing tips</li>
                                <li>Sample resumes</li>
                            </ul>
                            <button onClick={() => navigate('/resume-resources')} className="resource-btn">
                                Access Resources
                            </button>
                        </div>

                        <div className="resource-box">
                            <h3>Interview Prep</h3>
                            <p>Prepare for interviews with our comprehensive guides</p>
                            <ul className="resource-list">
                                <li>Common questions</li>
                                <li>Interview tips</li>
                                <li>Mock interviews</li>
                            </ul>
                            <button onClick={() => navigate('/interview-prep')} className="resource-btn">
                                Start Preparing
                            </button>
                        </div>

                        <div className="resource-box">
                            <h3>Career Planning</h3>
                            <p>Plan your career path with expert guidance</p>
                            <ul className="resource-list">
                                <li>Career guides</li>
                                <li>Industry insights</li>
                                <li>Skill assessments</li>
                            </ul>
                            <button onClick={() => navigate('/career-planning')} className="resource-btn">
                                Explore Guides
                            </button>
                        </div>
                    </div>

                    <section className="learning-paths">
                        <h2>Learning Paths</h2>
                        <div className="paths">
                            <div className="path">
                                <h3>Technical Skills</h3>
                                <p>Develop in-demand technical skills</p>
                                <button onClick={() => navigate('/technical-skills')} className="path-btn">Learn More</button>
                            </div>
                            <div className="path">
                                <h3>Soft Skills</h3>
                                <p>Enhance your professional soft skills</p>
                                <button onClick={() => navigate('/soft-skills')} className="path-btn">Learn More</button>
                            </div>
                            <div className="path">
                                <h3>Leadership</h3>
                                <p>Develop essential leadership skills</p>
                                <button onClick={() => navigate('/leadership')} className="path-btn">Learn More</button>
                            </div>
                        </div>
                    </section>

                    <section className="newsletter">
                        <h2>Stay Updated</h2>
                        <p>Get the latest career tips and resources delivered to your inbox</p>
                        <button onClick={() => navigate('/newsletter')} className="newsletter-btn">
                            Subscribe to Newsletter
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Resources; 