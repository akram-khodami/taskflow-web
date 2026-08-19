import apiClient from './client';

export const register = async (data) => {
    const response = await apiClient.post('/register', data);

    return response.data;
};

export const login = async (data) => {
    const response = await apiClient.post('/login', data);

    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post('/logout');

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('/user');

    return response.data;
};