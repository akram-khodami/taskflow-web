import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { useProjectTasks } from '../hooks/useTasks';
import { useEffect, useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import PageHeader from '../components/common/PageHeader';
import BackButton from '../components/common/BackButton';
import Pagination from '../components/common/Pagination';
import SearchInput from '../components/common/SearchInput';

function ProjectDetails() {
    const [showForm, setShowForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);

    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const { projectId } = useParams();

    const numericProjectId = Number(projectId);
    const isValidProjectId = !Number.isNaN(numericProjectId) && numericProjectId > 0;

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Reset page when search changes
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const {
        data,
        isLoading,
        isError,
        isFetching,
    } = useProject(numericProjectId, {
        enabled: isValidProjectId,
    });

    const {
        data: tasksData,
        isLoading: tasksLoading,
        isError: tasksError,
        isFetching: isTasksFetching,
    } = useProjectTasks(numericProjectId, {
        search: debouncedSearch,
        page,
        sortBy,
        sortOrder,
    }, {
        enabled: isValidProjectId,
    });

    // Handle invalid project ID
    if (!isValidProjectId) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-6xl">
                    <BackButton to="/projects" label="Back to projects" />
                    <div className="mt-6">
                        <EmptyState message="Invalid project ID." />
                    </div>
                </div>
            </div>
        );
    }

    // Initial loading for project
    if (isLoading) {
        return <LoadingState message="Loading project..." />;
    }

    // Project error
    if (isError) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-6xl">
                    <BackButton to="/projects" label="Back to projects" />
                    <div className="mt-6">
                        <ErrorState error="Failed to load the Project." />
                    </div>
                </div>
            </div>
        );
    }

    const project = data?.data;
    const tasks = tasksData?.data ?? [];

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="mx-auto max-w-6xl">
                    <BackButton to="/projects" label="Back to projects" />
                    <div className="mt-6">
                        <EmptyState message="Project not found." />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <div className="mt-8 flex items-center justify-between">
                    <PageHeader
                        title="Project"
                        description="Manage Project and their Tasks."
                        isUpdating={isFetching}
                    />
                    <BackButton to="/projects" label="Back to projects" />
                </div>

                {/* Project Info Card */}
                <div className="mt-6 rounded-xl bg-white p-6 shadow">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {project.name}
                    </h1>

                    {project.description && (
                        <p className="mt-3 text-gray-600">
                            {project.description}
                        </p>
                    )}

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">Owner</p>
                            <p className="font-medium">
                                {project.owner?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Members</p>
                            <p className="font-medium">
                                {project.members_count}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <PageHeader
                            title="Tasks"
                            description="Tasks belonging to this project."
                            isUpdating={isTasksFetching}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setEditingRecord(null);
                                setShowForm(true);
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 mb-6 cursor-pointer"
                        >
                            + New Task
                        </button>
                    </div>

                    {/* Task Form */}
                    {showForm && (
                        <div className="mb-6">
                            <TaskForm
                                key={editingRecord?.id || 'new'}
                                task={editingRecord}
                                project={project}
                                projectId={numericProjectId}
                                onSuccess={() => {
                                    setShowForm(false);
                                    setEditingRecord(null);
                                }}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingRecord(null);
                                }}
                            />
                        </div>
                    )}

                    {/* Tasks Error */}
                    {tasksError && (
                        <ErrorState error="Failed to load the Project Tasks." />
                    )}

                    {/* Tasks Loading */}
                    {tasksLoading && !tasksError && (
                        <LoadingState message="Loading tasks..." />
                    )}

                    {/* Tasks List */}
                    {!tasksLoading && !tasksError && (
                        <div>
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                                <SearchInput
                                    value={search}
                                    onChange={setSearch}
                                    placeholder="Search tasks..."
                                />
                            </div>

                            {tasks.length === 0 ? (
                                <EmptyState message="No tasks found." />
                            ) : (
                                <>
                                    <TaskList
                                        tasks={tasks}
                                        project={project}
                                        onEdit={(task) => {
                                            setEditingRecord(task);
                                            setShowForm(true);
                                        }}
                                    />
                                    <Pagination
                                        currentPage={tasksData?.meta.current_page}
                                        lastPage={tasksData?.meta.last_page}
                                        onPageChange={setPage}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectDetails;