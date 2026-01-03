import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // Check localStorage for existing session
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('globeTrotterUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('globeTrotterUser', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signup = async (email, password, firstName, lastName) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Signup failed');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('globeTrotterUser', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('globeTrotterUser');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
