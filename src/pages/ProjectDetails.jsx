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
import SortSelect from '../components/common/SortSelect';
import PageNavbar from '../components/common/PageNavbar';

function ProjectDetails() {
    const [showForm, setShowForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formKey, setFormKey] = useState(0);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);

    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const { projectId } = useParams();

    const numericProjectId = Number(projectId);
    const isValidProjectId =
        Number.isInteger(numericProjectId) && numericProjectId > 0;

    const TASK_SORT_OPTIONS = [
        { value: 'title', label: 'Title' },
        { value: 'created_at', label: 'Created At' },
        { value: 'updated_at', label: 'Updated At' },
        { value: 'due_date', label: 'Due Date' },
        { value: 'status', label: 'Status' },
    ];

    // Debounce search + reset page
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [search]);

    // Reset page when sort changes
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, sortBy, sortOrder]);

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
    } = useProjectTasks(
        numericProjectId,
        {
            search: debouncedSearch,
            page,
            sortBy,
            sortOrder,
        },
        {
            enabled: isValidProjectId,
            keepPreviousData: true,
        }
    );

    // --- Handlers ---
    const openNewForm = () => {
        setEditingRecord(null);
        setFormKey((k) => k + 1);
        setShowForm(true);
    };

    const openEditForm = (task) => {
        setEditingRecord(task);
        setFormKey((k) => k + 1);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingRecord(null);
    };

    // --- Render helpers ---
    const renderPageShell = (content) => (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <BackButton to="/projects" label="Back to projects" />
                <div className="mt-6">{content}</div>
            </div>
        </div>
    );

    // --- Invalid project ID ---
    if (!isValidProjectId) {
        return renderPageShell(
            <EmptyState message="Invalid project ID." />
        );
    }

    // --- Initial loading for project ---
    if (isLoading) {
        return <LoadingState message="Loading project..." />;
    }

    // --- Project error ---
    if (isError) {
        return renderPageShell(
            <ErrorState error="Failed to load the Project." />
        );
    }

    const project = data?.data;
    const tasks = tasksData?.data ?? [];

    if (!project) {
        return renderPageShell(
            <EmptyState message="Project not found." />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PageNavbar pageName="Project" />
            <div className="mx-auto max-w-6xl">

                <div className="mt-8 flex items-center justify-between">
                    <PageHeader
                        title={project.name}
                        description="Manage this project and its tasks."
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
                                {project.owner?.name ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Members</p>
                            <p className="font-medium">
                                {project.members_count ?? 0}
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
                            onClick={openNewForm}
                            className="mb-6 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            + New Task
                        </button>
                    </div>

                    {/* Task Form */}
                    {showForm && (
                        <div className="mb-6">
                            <TaskForm
                                key={formKey}
                                task={editingRecord}
                                project={project}
                                projectId={numericProjectId}
                                onSuccess={closeForm}
                                onCancel={closeForm}
                            />
                        </div>
                    )}

                    {/* Tasks Error */}
                    {tasksError && (
                        <ErrorState error="Failed to load the Project Tasks." />
                    )}

                    {/* Tasks Loading (initial only) */}
                    {tasksLoading && !tasksError && (
                        <LoadingState message="Loading tasks..." />
                    )}

                    {/* Tasks List */}
                    {/* Tasks List */}
                    {!tasksLoading && !tasksError && (
                        <div>
                            {/* Filters Row */}
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1">
                                    <SearchInput
                                        value={search}
                                        onChange={setSearch}
                                        placeholder="Search tasks..."
                                    />
                                </div>

                                <SortSelect
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSortByChange={setSortBy}
                                    onSortOrderChange={setSortOrder}
                                    options={TASK_SORT_OPTIONS}
                                />
                            </div>

                            {tasks.length === 0 ? (
                                <EmptyState message="No tasks found." />
                            ) : (
                                <>
                                    <TaskList
                                        tasks={tasks}
                                        project={project}
                                        onEdit={openEditForm}
                                    />
                                    <Pagination
                                        currentPage={tasksData?.meta?.current_page ?? 1}
                                        lastPage={tasksData?.meta?.last_page ?? 1}
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