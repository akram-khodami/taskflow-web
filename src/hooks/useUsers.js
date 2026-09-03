import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getUsers } from '../api/users';

export function useUsers(params = {}) {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => getUsers(params),
        placeholderData: keepPreviousData,
    });
}