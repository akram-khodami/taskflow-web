import apiClient from './client';

export const createComment = async ({ taskId, data }) => {
    const response = await apiClient.post(
        `/tasks/${taskId}/comments`,
        data
    );

    return response.data;
};