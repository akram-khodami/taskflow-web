import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users';
import UserTable from '../components/users/UserTable';

const Users = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
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

            <UserTable users={data.data} />
        </div>
    );
};

export default Users;