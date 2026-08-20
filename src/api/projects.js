import apiClient from './client';

export const getProjects = async (params = {}) => {
    const response = await apiClient.get('/projects', {
        params,
    });

    return response.data;
};

export const getProject = async (id) => {
    const response = await apiClient.get(`/projects/${id}`);

    return response.data;
};

export const createProject = async (data) => {
    const response = await apiClient.post('/projects', data);

    return response.data;
};

export const updateProject = async ({ id, data }) => {
    const response = await apiClient.put(`/projects/${id}`, data);

    return response.data;
};