import { useProjects } from '../hooks/useProjects';

function Projects() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useProjects();

    if (isLoading) {
        return (
            <div className="p-8">
                Loading projects...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-red-600">
                Failed to load projects.
            </div>
        );
    }

    const projects = data?.data ?? [];

    if (projects.length === 0) {
        return (
            <div className="p-8">
                <h1 className="mb-4 text-2xl font-bold">
                    Projects
                </h1>

                <p className="text-gray-600">
                    No projects found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-6 text-3xl font-bold">
                    Projects
                </h1>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-xl bg-white p-6 shadow"
                        >
                            <h2 className="text-xl font-semibold">
                                {project.name}
                            </h2>

                            <p className="mt-2 text-gray-600">
                                {project.description}
                            </p>

                            <div className="mt-4 flex gap-4 text-sm text-gray-500">
                                <span>
                                    Tasks: {project.tasks_count}
                                </span>

                                <span>
                                    Members: {project.members_count}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;