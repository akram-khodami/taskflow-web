import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { createComment, getComment, updateComment, deleteComment } from '../api/comments';

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', Number(variables.taskId)],
            });
        },
    });
}

export function useComment(id) {
    return useQuery({
        queryKey: ['comments', id != null ? Number(id) : null],
        queryFn: () => getComment(id),
        enabled: !!id,
    });
}

export function useUpdateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateComment,
        onSuccess: (updatedComment, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['comments', Number(variables.id)],
            });

            const taskId = variables.taskId ?? updatedComment?.taskId;
            if (taskId) {
                queryClient.invalidateQueries({
                    queryKey: ['tasks', Number(taskId)],
                });
            }
        },
    });
}

export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, variables) => {
            const taskId = variables.taskId;
            if (taskId) {
                queryClient.invalidateQueries({
                    queryKey: ['tasks', Number(taskId)],
                });
            }
        },
    });
}