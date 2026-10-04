import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PageNavbar({ appName, pageName }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
        }
    };

    const userInitial = user?.name?.charAt(0).toUpperCase() ?? 'U';

    return (
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/20">
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-base font-bold tracking-tight text-gray-900">
                            {appName ?? 'TaskFlow'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {pageName ?? 'Dashboard'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {user?.name && (
                        <div className="hidden items-center gap-2.5 sm:flex">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-sm font-semibold text-gray-700 ring-2 ring-white">
                                {userInitial}
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.email ?? 'Online'}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoggingOut ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Logout</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default PageNavbar;