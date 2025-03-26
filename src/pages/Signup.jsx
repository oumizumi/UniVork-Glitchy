import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('EN');

  const translations = {
    EN: {
      title: 'Choose Your Path',
      subtitle: 'Select your account type to get started',
      student: {
        title: 'I am a Student',
        description: 'Looking for internships and job opportunities'
      },
      employer: {
        title: 'I am an Employer',
        description: 'Looking to hire talented students'
      },
      loginPrompt: 'Already have an account?',
      loginButton: 'Log in'
    },
    FR: {
      title: 'Choisissez Votre Voie',
      subtitle: 'Sélectionnez votre type de compte pour commencer',
      student: {
        title: 'Je suis Étudiant',
        description: 'À la recherche de stages et d\'opportunités professionnelles'
      },
      employer: {
        title: 'Je suis Employeur',
        description: 'À la recherche d\'étudiants talentueux'
      },
      loginPrompt: 'Vous avez déjà un compte?',
      loginButton: 'Connexion'
    }
  };

  const currentLang = translations[language];

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="signup-logo" onClick={() => navigate('/')}>
          UniVork
        </div>
        <div className="language-selector">
          <span
            className={language === 'EN' ? 'active' : ''}
            onClick={() => setLanguage('EN')}
          >
            EN
          </span>
          <span className="divider">|</span>
          <span
            className={language === 'FR' ? 'active' : ''}
            onClick={() => setLanguage('FR')}
          >
            FR
          </span>
        </div>
      </header>

      <main className="signup-content">
        <h1>{currentLang.title}</h1>
        <p className="subtitle">{currentLang.subtitle}</p>

        <div className="path-options">
          <div className="path-card" onClick={() => navigate('/signup/form')}>
            <div className="icon student-icon">👨‍🎓</div>
            <h2>{currentLang.student.title}</h2>
            <p>{currentLang.student.description}</p>
          </div>

          <div className="path-card" onClick={() => navigate('/signup/employer')}>
            <div className="icon employer-icon">💼</div>
            <h2>{currentLang.employer.title}</h2>
            <p>{currentLang.employer.description}</p>
          </div>
        </div>

        <div className="login-prompt">
          {currentLang.loginPrompt}{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            {currentLang.loginButton}
          </span>
        </div>
      </main>
    </div>
  );
}

export default Signup;









