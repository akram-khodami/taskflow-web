import { useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/users/UserTable';
import Pagination from '../components/common/Pagination';
import SearchInput from '../components/common/SearchInput';
import PageHeader from '../components/common/PageHeader';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import BackButton from '../components/common/BackButton';

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
    } = useUsers(
        {
            search: debouncedSearch,
            role,
            page,
            sortBy,
            sortOrder,
        });

    if (isLoading) {
        return <LoadingState message="Loading task..." />
    }

    if (isError) {
        return <ErrorState error={error.message} />
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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <div className="mt-8 flex items-center justify-between">
                    <PageHeader
                        title="Users"
                        description="Manage users and their roles."
                        isUpdating={isFetching}
                    />
                    <BackButton to={`/dashboard`} label="Back to dashboard" />
                </div>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name or email..."
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

                <Pagination
                    currentPage={data.meta.current_page}
                    lastPage={data.meta.last_page}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default Users;