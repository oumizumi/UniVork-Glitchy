import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [generatedOTP, setGeneratedOTP] = useState("");
  const inputRefs = useRef([]);

  const otpGeneratedRef = useRef(false);

  useEffect(() => {
    if (location.state?.fromForgotPassword && !otpGeneratedRef.current) {
      otpGeneratedRef.current = true;

      const storedOTP = sessionStorage.getItem("generatedOTP");
      if (!storedOTP) {
        generateAndShowOTP();
      } else {
        setGeneratedOTP(storedOTP); 
      }
    }

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location.state]);

  const generateAndShowOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(newOTP);
    sessionStorage.setItem("generatedOTP", newOTP); 
    alert(`Your OTP is: ${newOTP}`);
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (newOtp.join("").length === 4) {
      verifyOTP(newOtp.join(""));
    }

    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";

      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }

      setOtp(newOtp);
    }
  };

  const verifyOTP = (enteredOTP) => {
    if (enteredOTP === generatedOTP) {
      navigate("/reset-password");
    } else {
      alert("Unfortunately, the OTP is not valid. Please doublecheck and try again.");
    }
  };

  const resendOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(newOTP);
    sessionStorage.setItem("generatedOTP", newOTP); 
    alert(`New OTP: ${newOTP}`);
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-box">
        <h2 className="verify-otp-title">Authentication</h2>
        <p className="verify-otp-text">The OTP has been sent to your email address. Please enter it:</p>

        <div className="verify-otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="verify-otp-input"
            />
          ))}
        </div>

        <div className="verify-otp-buttons">
          <button onClick={resendOTP} className="verify-otp-resend">
            Resend OTP
          </button>
        </div>

        <div className="verify-otp-navigation">
          <button onClick={() => navigate('/forgot-password')} className="verify-otp-secondary-button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;




















