import apiClient from './client';

export const getProjects = async (params = {}) => {
    const response = await apiClient.get('/projects', {
        params,
    });

    return response.data;
};