import { useEffect, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import Pagination from '../components/common/Pagination';
import SearchInput from '../components/common/SearchInput';
import PageHeader from '../components/common/PageHeader';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

function Projects() {

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
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
    }, [debouncedSearch]);

    //✅all Hooks must be called at the top level of the component, before any early returns or conditional logic. This is a rule of React Hooks to ensure that hooks are called in the same order on every render.
    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useProjects(
        {
            search: debouncedSearch,
            page,
            sortBy,
            sortOrder,
        }
    );

    //✅ Exit conditions after all hooks"
    if (isLoading) {
        return <LoadingState message="Loading projects..." />
    }

    if (isError) {
        return <ErrorState error="Failed to load Projects." />
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

    const projects = data?.data ?? [];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <PageHeader
                            title="Projects"
                            description="Manage your projects and tasks."
                            isUpdating={isFetching}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setEditingProject(null);
                                setShowForm(true);
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mb-6"
                        >
                            + New Project
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="mb-8">
                        <ProjectForm
                            key={editingProject?.id || 'new'}
                            project={editingProject}
                            onSuccess={() => {
                                setShowForm(false);
                                setEditingProject(null);
                            }}
                        />
                    </div>
                )}


                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search projects..."
                    />
                </div>


                <ProjectList
                    projects={projects}
                    onEdit={(project) => {
                        setEditingProject(project);
                        setShowForm(true);
                    }}
                />

                <Pagination
                    currentPage={data.meta.current_page}
                    lastPage={data.meta.last_page}
                    onPageChange={setPage}
                />

            </div>
        </div >
    );
}

export default Projects;