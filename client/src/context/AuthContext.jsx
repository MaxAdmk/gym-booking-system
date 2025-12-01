import { createContext, useState, useEffect, useContext } from "react";
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checking the existence of token in LocalStorage
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
        
            if (token && savedUser) {
                // If token exists
                api.defaults.headers.Authorization = `Bearer ${token}`;
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;

        // Saving the data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(user);
        return user;
    };

    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.Authorization;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);