import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { projectSchema } from '../../schemas/project';
import { useProject, useCreateProject, useUpdateProject } from '../../hooks/useProjects';
import { useUsers } from '../../hooks/useUsers';
import { applyApiValidationErrors } from '../../utils/apiError';

function ProjectForm({ project, onSuccess }) {
    //✅all Hooks must be called at the top level of the component, before any early returns or conditional logic. This is a rule of React Hooks to ensure that hooks are called in the same order on every render.
    const {
        mutateAsync: createProject,
        isPending: isCreating,
        isError: isCreatingError
    } = useCreateProject();

    const {
        mutateAsync: updateProject,
        isPending: isUpdating,
        isError: isUpdatingError
    } = useUpdateProject();

    const {
        data: projectData,
        isLoading: projectLoading
    } = useProject(project?.id, {
        enabled: Boolean(project?.id),
    });

    const {
        data: usersData,
        isLoading: usersLoading,
        isError: usersError
    } = useUsers({ exclude_admins: true });

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: '',
            description: '',
            members: [],
        },
    });

    useEffect(() => {
        if (!projectData?.data) {
            return;
        }

        const project = projectData.data;
        reset({
            name: project.name ?? '',
            description: project.description ?? '',
            members: project.members?.map((member) => String(member.id)) ?? [],
        });
    }, [projectData, reset]);

    const users = usersData?.data ?? [];
    const isEditMode = Boolean(project);
    const isPending = isCreating || isUpdating;
    const hasError = isCreatingError || isUpdatingError;

    if (isEditMode && projectLoading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow mb-6">
                Loading project data...
            </div>
        );
    }

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await updateProject({
                    id: project.id,
                    data,
                });
            } else {
                await createProject(data);
            }

            onSuccess?.();
        } catch (error) {
            applyApiValidationErrors(error, setError);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl bg-white p-6 shadow mb-6"
        >
            <h2 className="text-xl font-semibold">
                {isEditMode ? 'Edit Project' : 'Create Project'}
            </h2>

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

            <div>
                <label
                    htmlFor="members"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Members
                </label>

                {usersLoading && (
                    <p className="text-sm text-gray-500">
                        Loading users...
                    </p>
                )}

                {usersError && (
                    <p className="text-sm text-red-600">
                        Failed to load users.
                    </p>
                )}

                {!usersLoading && !usersError && (
                    <select
                        id="members"
                        multiple
                        {...register('members')}
                        className="min-h-32 w-full rounded-lg border px-3 py-2"
                    >
                        {users.map((user) => (
                            <option
                                key={user.id}
                                value={String(user.id)}
                            >
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                )}

                {errors.members && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.members.message}
                    </p>
                )}

                <p className="mt-1 text-xs text-gray-500">
                    Hold Ctrl (Windows) or Command (Mac) to select multiple members.
                </p>
            </div>

            {hasError && (
                <p className="text-sm text-red-600">
                    Failed to save project. Please try again.
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending
                    ? 'Saving...'
                    : isEditMode
                        ? 'Update Project'
                        : 'Create Project'}
            </button>
        </form>
    );
}

export default ProjectForm;