import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { getProjectTasks } from '../api/tasks';
import { createTask } from '../api/tasks';

export function useProjectTasks(projectId, params = {}) {
    return useQuery({
        queryKey: ['project-tasks', projectId, params],
        queryFn: () => getProjectTasks(projectId, params),
        enabled: !!projectId,
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