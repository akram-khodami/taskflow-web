import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    getProjectTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} from '../api/tasks';

export function useProjectTasks(projectId, params = {}) {
    const id = Number(projectId);

    return useQuery({
        queryKey: ['project-tasks', id, params],
        queryFn: () => getProjectTasks(id, params),
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

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,

        onSuccess: (updatedTask, variables) => {
            // update that task
            queryClient.invalidateQueries({
                queryKey: ['tasks', Number(variables.id)],
            });

            // update task list
            const projectId = variables.projectId ?? updatedTask?.project_id;
            if (projectId) {
                queryClient.invalidateQueries({
                    queryKey: ['project-tasks', Number(projectId)],
                });
            }
        },
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', Number(variables.id)],
            });
        },
    });
}