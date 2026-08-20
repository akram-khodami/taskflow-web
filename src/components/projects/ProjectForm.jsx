import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { projectSchema } from '../../schemas/project';
import { useCreateProject } from '../../hooks/useProjects';
import { useUsers } from '../../hooks/useUsers';
import { applyApiValidationErrors } from '../../utils/apiError';

function ProjectForm({ onSuccess }) {
    const {
        register,
        handleSubmit,
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

    const {
        mutateAsync: createProject,
        isPending,
        isError,
    } = useCreateProject();

    const {
        data: usersData,
        isLoading: usersLoading,
        isError: usersError,
    } = useUsers({
        exclude_admins: true,
    });

    const users = usersData?.data ?? [];

    const onSubmit = async (data) => {
        try {
            await createProject(data);

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
                                value={user.id}
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