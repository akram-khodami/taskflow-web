import { useQuery } from '@tanstack/react-query';

import { getProjects } from '../api/projects';

export function useProjects(params = {}) {
    return useQuery({
        queryKey: ['projects', params],
        queryFn: () => getProjects(params),
    });
}