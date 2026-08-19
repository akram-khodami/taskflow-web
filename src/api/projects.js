import apiClient from './client';

export const getProjects = async (params = {}) => {
    const response = await apiClient.get('/projects', {
        params,
    });

    return response.data;
};

export const createProject = async (data) => {
    const response = await apiClient.post('/projects', data);

    return response.data;
};