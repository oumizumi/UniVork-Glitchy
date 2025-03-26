import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './SignupEmployer.css';
import SignupNavbar from '../layouts/SignupNavbar';
import { useDispatch, useSelector } from "react-redux";
import { signupEmployer } from "../actions/userActions";
import OTP from "../components/OTP";



const SignupEmployer = () => {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailsChecked, setIsEmailsChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false); 
  const [generatedOTP, setGeneratedOTP] = useState(""); 
  const [isOTPVerified, setIsOTPVerified] = useState(false); 

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const employerSignup = useSelector((state) => state.userSignup || {});
  const { loading, error, userInfo } = employerSignup;


  const isFormValid = username && companyName && email && password && confirmPassword && password === confirmPassword && isTermsChecked;

  
 useEffect(()=> {
  localStorage.removeItem("employerDashboardState"); 
   }, []); 



   
   const generateOTP = () => {
    return Math.floor(1000 + Math.random()*9000).toString(); 
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
      dispatch(signupEmployer(username, companyName, email, password));
    }
  };

  
  const handleCreateAccount = () => {
    otpPopup(); 
  }; 

  useEffect(() => {
    if (userInfo) {
      navigate('/employer-dashboard');
    }
  }, [userInfo, navigate]);


  return (
    <div className="signup-employer-container">
      <SignupNavbar />
      <div className="signup-employer-box">
        <h1>
          Sign Up
          <span className="subtitle">Discover the future of talent acquisition</span>
        </h1>

        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password (8 or more characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>


        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            checked={isTermsChecked}
            onChange={() => setIsTermsChecked(!isTermsChecked)}
          />
          <label htmlFor="terms">
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => navigate('/employer-terms')}
            >
              Yes, I understand and agree to the UniVork Terms of <br />
              Service including the User Agreement and the Privacy Policy.
            </span>
          </label>
        </div>


        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}


        <button
          className="create-account"
          onClick={handleCreateAccount}
          disabled={!isFormValid}
        >
          Create Account
        </button>

        <p className="login-prompt">
          Already have a UniVork account?{' '}
          <span
            className="login-link"
            onClick={() => navigate('/login')}
          >
            Log In
          </span>
        </p>
      </div>
      {isOTPModalOpen && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2> Authentication </h2>
            <p> The OTP has been sent to your email address. Please enter it: </p>
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

export default SignupEmployer;











