import apiClient from './client';

export const createComment = async ({ taskId, data }) => {
    const response = await apiClient.post(
        `/tasks/${taskId}/comments`,
        data
    );

    return response.data;
};

export const getComment = async (id) => {
    const response = await apiClient.get(`/comments/${id}`);
    return response.data;
};

export const updateComment = async ({ id, data }) => {
    const response = await apiClient.put(`/comments/${id}`, data);
    return response.data;
};

export const deleteComment = async ({ id }) => {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
};
