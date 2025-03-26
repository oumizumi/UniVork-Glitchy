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
    localStorage.removeItem("studentDashboardState");
  }, []);

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
      finalizeSignup();
    } else {
      alert("Unfortunately, the OTP is not valid. Please doublecheck and try again.");
    }
  };

  const finalizeSignup = () => {
    if (isFormValid) {
      const userData = { username: formData.username, email: formData.email, password: formData.password };
      localStorage.clear();
      dispatch(signupStudent(formData.username, formData.email, formData.password));
      localStorage.setItem('token', 'dummy_token');
      navigate('/studentdashboard');
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
    otpPopup();
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/studentdashboard');
    }
  }, [userInfo, navigate]);

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

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>

      {isOTPModalOpen && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2>Authentication</h2>
            <p>The OTP has been sent to your email address. Please enter it:</p>
            <OTP length={4} onOtpSubmit={verifyOTP} />
            <div className="otp-buttons">
              <button onClick={() => setIsOTPModalOpen(false)}>Cancel</button>
              <button onClick={resendOTP}>Resend OTP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;



















