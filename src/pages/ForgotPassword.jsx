import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      navigate('/verify-otp', { state: { fromForgotPassword: true } });
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <p className="forgot-password-text">Enter the email associated with the password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
            required
          />
          <button type="submit" className="forgot-password-button">Submit</button>
        </form>
        <div className="forgot-password-buttons">
          <button onClick={() => navigate('/login')} className="forgot-password-secondary-button">Back</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;





