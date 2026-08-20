function ProjectCard({ project, onEdit }) {
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

            <div className="mt-5">
                <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Edit
                </button>
            </div>
        </article>
    );
}

export default ProjectCard;