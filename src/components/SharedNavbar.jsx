import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SharedNavbar.css';

function SharedNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [language, setLanguage] = useState('EN');
    const [translations, setTranslations] = useState({
        forStudents: 'For students',
        forEmployers: 'For employers',
        resources: 'Resources',
        login: 'Log in',
        signup: 'Sign up'
    });

    useEffect(() => {
        setTranslations(language === 'EN' ? {
            forStudents: 'For students',
            forEmployers: 'For employers',
            resources: 'Resources',
            login: 'Log in',
            signup: 'Sign up'
        } : {
            forStudents: 'Pour étudiants',
            forEmployers: 'Pour employeurs',
            resources: 'Ressources',
            login: 'Connexion',
            signup: "S'inscrire"
        });
    }, [language]);

    return (
        <header className="shared-header">
            <div
                className="shared-logo"
                onClick={() => navigate('/')}
                aria-label="Home"
            >
                UniVork
            </div>
            <nav className="shared-nav">
                <ul>
                    <li
                        onClick={() => navigate('/for-students')}
                        className={`nav-item ${location.pathname === '/for-students' ? 'active' : ''}`}
                    >
                        {translations.forStudents}
                    </li>
                    <li
                        onClick={() => navigate('/for-employers')}
                        className={`nav-item ${location.pathname === '/for-employers' ? 'active' : ''}`}
                    >
                        {translations.forEmployers}
                    </li>
                    <li
                        onClick={() => navigate('/resources')}
                        className={`nav-item ${location.pathname === '/resources' ? 'active' : ''}`}
                    >
                        {translations.resources}
                    </li>
                </ul>
            </nav>
            <div className="shared-auth">
                <div className="language-toggle" onClick={() => setLanguage(prev => prev === 'EN' ? 'FR' : 'EN')}>
                    <span className={language === 'EN' ? 'language-active' : ''}>EN</span>
                    <span className="divider">|</span>
                    <span className={language === 'FR' ? 'language-active' : ''}>FR</span>
                </div>
                <button className="login" onClick={() => navigate('/login')}>
                    {translations.login}
                </button>
                <button className="signup" onClick={() => navigate('/signup')}>
                    {translations.signup}
                </button>
            </div>
        </header>
    );
}

export default SharedNavbar; 