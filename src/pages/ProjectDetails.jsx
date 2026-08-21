import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import { useProjectTasks } from '../hooks/useTasks';
import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

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
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                Loading project...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p className="text-red-600">
                    Failed to load project.
                </p>

                <Link
                    to="/projects"
                    className="mt-4 inline-block text-blue-600"
                >
                    Back to projects
                </Link>
            </div>
        );
    }

    const project = data?.data;
    const tasks = tasksData?.data ?? [];

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p>Project not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <Link
                    to="/projects"
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Back to projects
                </Link>

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
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Tasks
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Tasks belonging to this project.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowTaskForm(true)}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            + New Task
                        </button>
                    </div>

                    {tasksLoading && (
                        <div className="rounded-xl bg-white p-6 shadow">
                            Loading tasks...
                        </div>
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
                        <TaskList tasks={tasks} />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectDetails;