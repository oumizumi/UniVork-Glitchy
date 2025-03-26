import React from 'react';
import { Link } from 'react-router-dom';
import './LoginNavbar.css';

const LoginNavbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          UniVork
        </Link>
        <div className="nav-links">
          <Link to="/for-students">For students</Link>
          <Link to="/for-employers">For employers</Link>
          <Link to="/resources">Resources</Link>
        </div>
        <div className="nav-right">
          <div className="language-toggle">
            <span className="active">EN</span>
            <span>FR</span>
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Log in</Link>
            <Link to="/signup" className="signup-btn">Sign up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;