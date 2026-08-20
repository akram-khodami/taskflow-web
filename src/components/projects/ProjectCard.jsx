import { useDeleteProject } from '../../hooks/useProjects';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onEdit }) {
    const {
        mutateAsync: deleteProject,
        isPending,
    } = useDeleteProject();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${project.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteProject(project.id);
        } catch (error) {
            console.error('Delete project error:', error);
        }
    };

    return (
        <article className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
                {project.name}
            </h2>

            {project.description && (
                <p className="mt-2 text-gray-600">
                    {project.description}
                </p>
            )}

            <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span>
                    Tasks: {project.tasks_count}
                </span>

                <span>
                    Members: {project.members_count}
                </span>
            </div>

            <div className="mt-5 flex gap-2">
                <Link
                    to={`/projects/${project.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    View
                </Link>

                <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </article>
    );
}

export default ProjectCard;