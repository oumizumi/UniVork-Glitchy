import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupNavbar.css';
function SignupNavbar() {
  const navigate = useNavigate();

  return (
    <div className="app2">
      <header className="header2">
        <div
          className="logo"
          onClick={() => navigate('/landingpage')}
        >
          UniVork
        </div>
        <div className="auth">
          <button className="login" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </header>
    </div>
  );
}

export default SignupNavbar;
