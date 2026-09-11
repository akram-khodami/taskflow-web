import apiClient from './client';

export const getProjectTasks = async (projectId, params = {}) => {
    const response = await apiClient.get(
        `/projects/${projectId}/tasks`,
        {
            params,
        }
    );

    return response.data;
};

export const getTask = async (taskId) => {
    const response = await apiClient.get(`/tasks/${taskId}`);

    return response.data;
};

export const createTask = async ({ projectId, data }) => {
    const response = await apiClient.post(
        `/projects/${projectId}/tasks`,
        data
    );

    return response.data;
};

export const updateTask = async ({ id, data }) => {
    const response = await apiClient.put(`/tasks/${id}`, data);

    return response.data;
};

export const deleteTask = async (id) => {
    
    const response = await apiClient.delete(`/tasks/${id}`);

    return response.data;
};
