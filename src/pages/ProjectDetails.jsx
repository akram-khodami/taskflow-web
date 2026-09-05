import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { useProjectTasks } from '../hooks/useTasks';
import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import PageHeader from '../components/common/PageHeader';
import BackButton from '../components/common/BackButton';

function ProjectDetails() {

    const [showTaskForm, setShowTaskForm] = useState(false);

    const { projectId } = useParams();

    const numericProjectId = Number(projectId);

    const {
        data,
        isLoading,
        isError,
    } = useProject(numericProjectId);

    const {
        data: tasksData,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useProjectTasks(numericProjectId);

    if (isLoading) {
        return <LoadingState message="Loading project..." />
    }

    if (isError) {
        return <ErrorState error="Failed to load the Project." />
    }

    const project = data?.data;
    const tasks = tasksData?.data ?? [];

    if (!project) {
        return <EmptyState message='Project not found.' />
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <BackButton to="/projects" label="Back to projects" />

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
                            <p className="text-sm text-gray-500">
                                Owner
                            </p>

                            <p className="font-medium">
                                {project.owner?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Members
                            </p>

                            <p className="font-medium">
                                {project.members_count}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <PageHeader
                            title="Tasks"
                            description="Tasks belonging to this project."

                        />
                        <button
                            type="button"
                            onClick={() => setShowTaskForm(true)}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            + New Task
                        </button>
                    </div>

                    {tasksLoading && (
                        <LoadingState message="Loading tasks..." />
                    )}

                    {tasksError && (
                        <div className="rounded-xl bg-white p-6 shadow">
                            <p className="text-red-600">
                                Failed to load tasks.
                            </p>
                        </div>
                    )}


                    {showTaskForm && (
                        <div className="mb-6">
                            <TaskForm
                                project={project}
                                projectId={numericProjectId}
                                onSuccess={() => {
                                    setShowTaskForm(false);
                                }}
                                onCancel={() => {
                                    setShowTaskForm(false);
                                }}
                            />
                        </div>
                    )}

                    {!tasksLoading && !tasksError && (
                        <TaskList
                            tasks={tasks}
                            project={project}
                        />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectDetails;