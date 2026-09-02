import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users';
import UserTable from '../components/users/UserTable';
import UserPagination from '../components/users/UserPagination';

const Users = () => {

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, role]);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users', {
            search: debouncedSearch,
            role,
            page,
        }],
        queryFn: () => getUsers({
            search: debouncedSearch,
            role,
            page,
        }),
    });
    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="p-6 text-red-600">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage users and their roles.
                </p>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                />
            </div>
            <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
            </select>

            <UserTable users={data.data} />

            <UserPagination
                currentPage={data.meta.current_page}
                lastPage={data.meta.last_page}
                onPageChange={setPage}
            />
        </div>
    );
};

export default Users;