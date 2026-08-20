import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import { useState } from 'react';

function Projects() {

    //✅all Hooks must be called at the top level of the component, before any early returns or conditional logic. This is a rule of React Hooks to ensure that hooks are called in the same order on every render.
    const { data, isLoading, isError, error } = useProjects();
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    //✅ Exit conditions after all hooks"
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

                <button
                    type="button"
                    onClick={() => {
                        setEditingProject(null);
                        setShowForm(true);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                    + New Project
                </button>

                {showForm && (
                    <div className="mb-8">
                        <ProjectForm
                            key={editingProject?.id || 'new'}
                            project={editingProject}
                            onSuccess={() => {
                                setShowForm(false);
                                setEditingProject(null);
                            }}
                        />
                    </div>
                )}

                <ProjectList
                    projects={projects}
                    onEdit={(project) => {
                        setEditingProject(project);
                        setShowForm(true);
                    }}
                />

            </div>
        </div>
    );
}

export default Projects;