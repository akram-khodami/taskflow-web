import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { projectSchema } from '../../schemas/project';
import { useCreateProject } from '../../hooks/useProjects';

function ProjectForm({ onSuccess }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: '',
            description: '',
            members: [],
        },
    });

    const {
        mutateAsync: createProject,
        isPending,
        isError,
    } = useCreateProject();

    const onSubmit = async (data) => {
        try {
            await createProject(data);

            onSuccess?.();
        } catch (error) {
            console.error('Create project error:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl bg-white p-6 shadow mb-6"
        >
            <div>
                <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Project name
                </label>

                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    rows={4}
                    {...register('description')}
                    className="w-full rounded-lg border px-3 py-2"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {isError && (
                <p className="text-sm text-red-600">
                    Failed to create project. Please try again.
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? 'Creating...' : 'Create project'}
            </button>
        </form>
    );
}

export default ProjectForm;