const UserTable = (
    {
        users,
        sortBy,
        sortOrder,
        onSort,
    }) => {

    const getSortIcon = (column) => {
        if (sortBy !== column) {
            return '';
        }

        return sortOrder === 'asc' ? ' ↑' : ' ↓';
    };
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">
                            <button
                                type="button"
                                onClick={() => onSort('name')}
                                className="inline-flex items-center gap-1 font-medium transition hover:text-gray-900"
                            >
                                Name{getSortIcon('name')}
                            </button>
                        </th>

                        <th className="px-6 py-3">
                            <button
                                type="button"
                                onClick={() => onSort('email')}
                                className="inline-flex items-center gap-1 font-medium transition hover:text-gray-900"
                            >
                                Email{getSortIcon('email')}
                            </button>
                        </th>

                        <th className="px-6 py-3">
                            <button
                                type="button"
                                onClick={() => onSort('role')}
                                className="inline-flex items-center gap-1 font-medium transition hover:text-gray-900"
                            >
                                Role{getSortIcon('role')}
                            </button>
                        </th>

                        <th className="px-6 py-3">
                            <button
                                type="button"
                                onClick={() => onSort('created_at')}
                                className="inline-flex items-center gap-1 font-medium transition hover:text-gray-900"
                            >
                                Created At{getSortIcon('created_at')}
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-t bg-white hover:bg-gray-50"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {user.name}
                            </td>

                            <td className="px-6 py-4">
                                {user.email}
                            </td>

                            <td className="px-6 py-4">
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                    {user.role}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;