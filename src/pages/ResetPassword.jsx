import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      localStorage.setItem('userPassword', newPassword);
      navigate('/login'); 
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-text">Enter the new password</p>

        <div className="input-field">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="reset-password-button" onClick={handleResetPassword}>
          Reset 
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
