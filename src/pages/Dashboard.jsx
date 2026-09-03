import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                    <p className="text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            TaskFlow
                        </h1>
                        <p className="text-sm text-gray-500">
                            Project management made simple
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                {/* Welcome */}
                <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
                    <p className="text-sm font-medium text-blue-100">
                        Welcome back
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {user?.name}
                    </h2>

                    <p className="mt-2 text-blue-100">
                        {user?.email}
                    </p>

                    <p className="mt-6 max-w-xl text-sm leading-6 text-blue-100">
                        Manage your projects, collaborate with your team,
                        and keep your tasks organized in one place.
                    </p>
                </section>

                {/* Quick Access */}
                <section className="mt-8">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Quick Access
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Jump straight to the tools you use most.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Projects */}
                        <Link
                            to="/projects"
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 7h5l2 2h11v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                                        />
                                    </svg>
                                </div>

                                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                Projects
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Create, manage and track your projects and
                                team tasks.
                            </p>
                        </Link>

                        {/* Users */}
                        <Link
                            to="/users"
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-5a4 4 0 100-8 4 4 0 000 8zm6 2a3 3 0 100-6"
                                        />
                                    </svg>
                                </div>

                                <span className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-600">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                Users
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Browse users and manage your project
                                collaborators.
                            </p>
                        </Link>
                    </div>
                </section>

                {/* Overview */}
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Your Workspace
                    </h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Projects
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                —
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Tasks
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                —
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Team Members
                            </p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                —
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;

