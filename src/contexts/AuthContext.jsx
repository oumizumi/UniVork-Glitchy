import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            // For demo purposes, we'll simulate a successful login
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set up user session
            const userData = {
                email,
                token: `auth_token_${Date.now()}`,
                loginTime: new Date().toISOString()
            };

            // Store session data
            localStorage.setItem('sessionData', JSON.stringify(userData));
            localStorage.setItem('token', userData.token);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('email', email);

            setUser(userData);
            return userData;
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 