import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    createProject,
    getProjects,
} from '../api/projects';

export function useProjects(params = {}) {
    return useQuery({
        queryKey: ['projects', params],
        queryFn: () => getProjects(params),
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