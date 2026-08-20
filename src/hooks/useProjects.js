import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject,
} from '../api/projects';

export function useProjects(params = {}) {
    return useQuery({
        queryKey: ['projects', params],
        queryFn: () => getProjects(params),
    });
}

export function useProject(id) {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
}

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProject,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });

            queryClient.invalidateQueries({
                queryKey: ['projects', variables.id],
            });
        },
    });
}

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
}