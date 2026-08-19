import ProjectCard from './ProjectCard';

function ProjectList({ projects }) {
    if (projects.length === 0) {
        return (
            <div className="rounded-xl bg-white p-8 text-center shadow">
                <p className="text-gray-600">
                    No projects found.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
}

export default ProjectList;