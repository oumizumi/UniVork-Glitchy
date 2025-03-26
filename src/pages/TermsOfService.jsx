import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <div className="terms-container">
            <header className="terms-header">
                <div className="signup-logo" onClick={() => navigate('/')}>
                    UniVork
                </div>
            </header>

            <div className="terms-content">
                <h1>Terms of Service</h1>

                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to UniVork. By using our service, you agree to these terms. Please read them carefully.</p>
                </section>

                <section>
                    <h2>2. Using UniVork</h2>
                    <p>You must follow any policies made available to you within the Services.</p>
                    <p>Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and instructions we provide.</p>
                </section>

                <section>
                    <h2>3. Privacy and Copyright Protection</h2>
                    <p>UniVork's privacy policies explain how we treat your personal data and protect your privacy when you use our Services.</p>
                    <p>We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers.</p>
                </section>

                <section>
                    <h2>4. Your Content in our Services</h2>
                    <p>Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold.</p>
                </section>

                <section>
                    <h2>5. Account Security</h2>
                    <p>You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password.</p>
                </section>

                <div className="terms-actions">
                    <button onClick={() => navigate(-1)} className="back-button">
                        Back to Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService; 