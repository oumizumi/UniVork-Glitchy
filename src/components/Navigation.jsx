import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <Link to="/" className="logo">
                UniVork
            </Link>

            <div className="nav-links">
                <Link to="/for-students" className="nav-item">
                    For students
                </Link>
                <Link to="/for-employers" className="nav-item">
                    For employers
                </Link>
                <Link to="/resources" className="nav-item">
                    Resources
                </Link>
            </div>

            <div className="right-section">
                <div className="language-selector">
                    <button className="active">EN</button>
                    <span>|</span>
                    <button>FR</button>
                </div>

                <div className="auth-buttons">
                    <Link to="/login" className="login-btn">
                        Log in
                    </Link>
                    <Link to="/signup" className="signup-btn">
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 