import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SignupForm.css';
import SignupNavbar from '../layouts/SignupNavbar';
import { useDispatch, useSelector } from "react-redux";
import { signupStudent } from "../actions/userActions";
import OTP from "../components/OTP";

const SignupForm = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('EN');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    receiveEmails: false,
    agreeToTerms: false
  });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const userSignup = useSelector((state) => state.userSignup || {});
  const { error = null, loading = false, userInfo = null } = userSignup;

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.agreeToTerms;

  useEffect(() => {
    // Clear any existing student dashboard state on initial load
    localStorage.removeItem("studentDashboardState");

    // If user is already logged in with token, redirect to dashboard
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (token && isAuthenticated === 'true') {
      navigate('/studentdashboard');
    }
  }, [navigate]);

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const otpPopup = () => {
    if (isFormValid) {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      alert(`Your OTP is: ${otp}`);
      setIsOTPModalOpen(true);
    }
  };

  const resendOTP = () => {
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    alert(`Your OTP is: ${newOTP}`);
  };

  const verifyOTP = (enteredOTP) => {
    if (enteredOTP === generatedOTP) {
      setIsOTPVerified(true);
      setIsOTPModalOpen(false);

      // Use our new function to create profile and redirect
      createProfile();
    } else {
      alert("Unfortunately, the OTP is not valid. Please doublecheck and try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Always bypass OTP for testing and go straight to dashboard
    createProfile();
    return;

    // For testing purposes, bypass OTP and go straight to dashboard
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('Bypassing OTP in development mode');
    //   createProfile();
    //   return;
    // }

    // otpPopup();
  };

  // Fill form with test data for quick testing
  const fillTestData = () => {
    setFormData({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      receiveEmails: false,
      agreeToTerms: true
    });
  };

  // New function to create profile and redirect
  const createProfile = () => {
    // Only set authentication data, no profile data at all

    // Save authentication data to localStorage
    localStorage.clear(); // Clear any existing localStorage data
    localStorage.setItem('token', 'dummy_token');
    localStorage.setItem('isAuthenticated', 'true');

    // Remove all profile data storage - user will need to fill this on dashboard

    // Dispatch signup action
    if (formData.username && formData.email && formData.password) {
      dispatch(signupStudent(formData.username, formData.email, formData.password));
    }

    console.log('Redirecting to dashboard with auth only:', {
      token: localStorage.getItem('token'),
      isAuthenticated: localStorage.getItem('isAuthenticated')
    });

    // Force redirect to dashboard
    window.location.href = '/studentdashboard';
  };

  return (
    <div className="signup-form-container">
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

      <div className="signup-form-content">
        <h1>Sign up for UniVork</h1>
        <p className="subtitle">Create a free account or <span onClick={() => navigate('/login')} className="login-link">log in</span></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="receiveEmails"
                checked={formData.receiveEmails}
                onChange={handleInputChange}
              />
              <span>I don't want to receive emails about UniVork and related updates, marketing best practices, and promotions</span>
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <span>By creating an account, you agree to our <span onClick={() => navigate('/terms')} className="login-link">Terms of Service</span></span>
            </label>
          </div>

          <button type="button" onClick={fillTestData} className="test-button" style={{ marginRight: '10px', background: '#ddd', color: '#333' }}>
            Fill Test Data
          </button>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>

      {isOTPModalOpen && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2>Authentication</h2>
            <p>Please enter the verification code sent to your email.</p>
            <OTP length={4} onOtpSubmit={verifyOTP} />
            <div className="otp-actions">
              <button onClick={resendOTP}>Resend Code</button>
              <button onClick={() => setIsOTPModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;



















