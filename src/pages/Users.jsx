import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users';
import UserTable from '../components/users/UserTable';
import UserPagination from '../components/users/UserPagination';

const Users = () => {

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1);

    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

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
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['users', {
            search: debouncedSearch,
            role,
            page,
            sortBy,
            sortOrder,
        }],
        queryFn: () => getUsers({
            search: debouncedSearch,
            role,
            page,
            sort_by: sortBy,
            sort_order: sortOrder,
        }),
        placeholderData: keepPreviousData,
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

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }

        setPage(1);
    };

    return (
        <div className="p-6">

            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Users
                    </h1>

                    {isFetching && (
                        <span className="text-sm text-gray-500">
                            Updating...
                        </span>
                    )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                    Manage users and their roles.
                </p>
            </div>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 sm:max-w-md"
                />

                <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="member">Member</option>
                </select>
            </div>

            <UserTable
                users={data.data}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
            />

            <UserPagination
                currentPage={data.meta.current_page}
                lastPage={data.meta.last_page}
                onPageChange={setPage}
            />
        </div>
    );
};

export default Users;