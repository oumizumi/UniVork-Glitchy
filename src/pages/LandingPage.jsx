import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('EN');

  return (
    <div className="app">
      <header className="header">
        <div
          className="logo"
          onClick={() => navigate('/')}
        >
          UniVork
        </div>
        <nav className="nav">
          <ul>
            <li
              className="nav-item"
              onClick={() => navigate('/for-students')}
            >
              For students
            </li>
            <li
              className="nav-item"
              onClick={() => navigate('/for-employers')}
            >
              For employers
            </li>
            <li
              className="nav-item"
              onClick={() => navigate('/resources')}
            >
              Resources
            </li>
          </ul>
        </nav>
        <div className="auth">
          <div className="language-toggle" onClick={() => setLanguage(prev => prev === 'EN' ? 'FR' : 'EN')}>
            <span className={language === 'EN' ? 'language-active' : ''}>EN</span>
            <span className="divider">|</span>
            <span className={language === 'FR' ? 'language-active' : ''}>FR</span>
          </div>
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
          <div className="headline">
            <h1>Connect with<br />Opportunity</h1>
          </div>
          <p className="subtext">
            UniVork bridges the gap between students and employers, creating
            meaningful connections that shape careers and drive innovation.
          </p>
          <div className="features">
            <div className="feature-card" onClick={() => navigate('/for-students')}>
              <h3>For Students</h3>
              <p>Find internships, part-time jobs, and career opportunities that align with your academic journey</p>
            </div>
            <div className="feature-card" onClick={() => navigate('/for-employers')}>
              <h3>For Employers</h3>
              <p>Access a pool of talented students and recent graduates ready to contribute to your organization</p>
            </div>
            <div className="feature-card" onClick={() => navigate('/resources')}>
              <h3>Resources</h3>
              <p>Access guides, tips, and tools to help you succeed in your career journey</p>
            </div>
          </div>
          <button className="get-started" onClick={() => navigate('/signup')}>
            Get Started Today
          </button>
        </div>
        <div className="image-section">
          <img src="https://placeholder.pics/svg/748x425" alt="Illustration" />
        </div>
      </main>
    </div>
  );
}

export default LandingPage;










