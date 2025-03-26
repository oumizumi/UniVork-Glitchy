import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth()
    }, [])

    const auth = () => {
        const token = localStorage.getItem('token')
        const isAuthenticated = localStorage.getItem('isAuthenticated')

        console.log('Auth Check:', {
            token,
            isAuthenticated,
            timestamp: new Date().toISOString()
        });

        if (!token || !isAuthenticated) {
            console.log('Authentication failed - redirecting to login');
            setIsAuthorized(false)
            // Clear any stale auth data
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            return;
        }

        console.log('Authentication successful');
        setIsAuthorized(true)
    }

    if (isAuthorized === null) {
        return (
            <div className="loading-auth">
                <h2>Verifying your access...</h2>
                <p>Please wait while we authenticate your session.</p>
            </div>
        );
    }

    if (!isAuthorized) {
        console.log('Access denied - redirecting to login page');
        return <Navigate to="/login" />
    }

    console.log('Access granted - rendering protected content');
    return children;
}

export default ProtectedRoute