import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';

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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Projects
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Manage your projects and tasks.
                    </p>
                </div>

                <ProjectForm />

                <ProjectList projects={projects} />
            </div>
        </div>
    );
}

export default Projects;