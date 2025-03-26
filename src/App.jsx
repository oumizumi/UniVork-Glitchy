import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AuthProvider } from './contexts/AuthContext';
import NavigationBarStudent from './layouts/NavigationBarStudent';
import NavigationBarEmployer from './layouts/NavigationBarEmployer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './styles/transitions.css';
import SignupEmployer from './pages/SignupEmployer';
import SignupForm from './pages/SignupForm';
import ForStudents from './pages/ForStudents';
import ForEmployers from './pages/ForEmployers';
import Resources from './pages/Resources';
import EmployerTerms from './components/employerTerms';
import StudentTerms from './components/studentTerms';
import TermsOfService from './pages/TermsOfService';
import Forbidden from './pages/Forbidden';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <div className={`app-container ${isDashboard ? 'dashboard-layout' : ''}`}>
      {isDashboard ? (
        location.pathname.includes('student') ? (
          <NavigationBarStudent />
        ) : (
          <NavigationBarEmployer />
        )
      ) : null}

      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <div className={`page-container ${isDashboard ? 'dashboard-content' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/employer" element={<SignupEmployer />} />
              <Route path="/signup/form" element={<SignupForm />} />
              <Route path="/for-students" element={<ForStudents />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/employer-terms" element={<EmployerTerms />} />
              <Route path="/student-terms" element={<StudentTerms />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route
                path="/studentdashboard/*"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer-dashboard/*"
                element={
                  <ProtectedRoute>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;




