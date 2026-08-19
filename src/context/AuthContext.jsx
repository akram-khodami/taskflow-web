import { createContext, useContext, useEffect, useState } from 'react';

import {
    getCurrentUser,
    login as loginApi,
    register as registerApi,
    logout as logoutApi,
} from '../api/auth';

import {
    getToken,
    setToken,
    removeToken,
} from '../api/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
            .then((response) => {
                setUser(response.user);
            })
            .catch(() => {
                removeToken();
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (data) => {
        const response = await loginApi(data);

        setToken(response.token);
        setUser(response.user);

        return response;
    };

    const register = async (data) => {
        const response = await registerApi(data);

        setToken(response.token);
        setUser(response.user);

        return response;
    };

    const logout = async () => {
        try {
            await logoutApi();
        } finally {
            removeToken();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}