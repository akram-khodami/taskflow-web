import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Welcome, {user?.name}
                        </h1>

                        <p className="mt-2 text-gray-600">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                <div className="mt-8 rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Quick Access
                    </h2>

                    <Link
                        to="/projects"
                        className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;