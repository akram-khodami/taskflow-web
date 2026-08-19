import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">
                Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-gray-600">
                Email: {user?.email}
            </p>

            <p className="text-gray-600">
                Role: {user?.role}
            </p>
        </div>
    );
}

export default Dashboard;