import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { createComment } from '../api/comments';

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