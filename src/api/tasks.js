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