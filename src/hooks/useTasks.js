import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    getProjectTasks,
    getTask,
    createTask,
} from '../api/tasks';

export function useProjectTasks(projectId, params = {}) {
    return useQuery({
        queryKey: ['project-tasks', projectId, params],
        queryFn: () => getProjectTasks(projectId, params),
        enabled: !!projectId,
    });
}
export function useTask(taskId) {
    return useQuery({
        queryKey: ['tasks', Number(taskId)],
        queryFn: () => getTask(taskId),
        enabled: !!taskId,
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['project-tasks', Number(variables.projectId)],
            });
        },
    });
}