import { useQuery } from '@tanstack/react-query';

import { getProjectTasks } from '../api/tasks';

export function useProjectTasks(projectId, params = {}) {
    return useQuery({
        queryKey: ['project-tasks', projectId, params],
        queryFn: () => getProjectTasks(projectId, params),
        enabled: !!projectId,
    });
}