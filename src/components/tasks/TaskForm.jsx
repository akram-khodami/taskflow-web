import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { taskSchema } from '../../schemas/task';
import { useCreateTask } from '../../hooks/useTasks';
import { applyApiValidationErrors } from '../../utils/apiError';

function TaskForm({ project, onSuccess, onCancel }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'backlog',
            priority: 'medium',
            due_date: '',
            assignee_id: '',
        },
    });

    const {
        mutateAsync: createTask,
        isPending,
    } = useCreateTask();

    const onSubmit = async (data) => {
        try {
            await createTask({
                projectId: project.id,
                data: {
                    ...data,

                    // Empty strings should become null
                    due_date: data.due_date || null,
                    assignee_id: data.assignee_id
                        ? Number(data.assignee_id)
                        : null,
                },
            });

            onSuccess?.();
        } catch (error) {
            applyApiValidationErrors(error, setError);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white p-6 shadow"
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Create Task
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add a task to {project.name}
                </p>
            </div>

            {/* Title */}
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    {...register('title')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />

                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="mb-4">
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />

                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Status + Priority */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>

                    <select
                        id="status"
                        {...register('status')}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="backlog">Backlog</option>
                        <option value="in_progress">In Progress</option>
                        <option value="in_review">In Review</option>
                        <option value="done">Done</option>
                    </select>

                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                <select
                    id="priority"
                    {...register('priority')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>

                {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.priority.message}
                    </p>
                )}
            </div>

            {/* Assignee */}
            <div className="mb-4">
                <label
                    htmlFor="assignee_id"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Assignee
                </label>

                <select
                    id="assignee_id"
                    {...register('assignee_id')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="">
                        Unassigned
                    </option>

                    {project.members?.map((member) => (
                        <option
                            key={member.id}
                            value={member.id}
                        >
                            {member.name} ({member.email})
                        </option>
                    ))}
                </select>

                {errors.assignee_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.assignee_id.message}
                    </p>
                )}
            </div>

            {/* Due date */}
            <div className="mb-6">
                <label
                    htmlFor="due_date"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Due Date
                </label>

                <input
                    id="due_date"
                    type="date"
                    {...register('due_date')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />

                {errors.due_date && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.due_date.message}
                    </p>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isPending ? 'Creating...' : 'Create Task'}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TaskForm;