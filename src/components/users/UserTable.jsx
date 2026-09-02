const UserTable = ({ users }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Created At</th>
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