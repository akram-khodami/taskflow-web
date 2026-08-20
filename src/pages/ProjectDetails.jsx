import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProjects';
import TaskList from '../components/tasks/TaskList';
import { useProjectTasks } from '../hooks/useTasks';

function ProjectDetails() {
    const { projectId } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useProject(projectId);

    const {
        data: tasksData,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useProjectTasks(projectId);


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

                    {!tasksLoading && !tasksError && (
                        <TaskList tasks={tasks} />
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectDetails;