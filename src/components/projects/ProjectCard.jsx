function ProjectCard({ project }) {
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
        </article>
    );
}

export default ProjectCard;