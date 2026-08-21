import { Link, useParams } from 'react-router-dom';

import { useTask } from '../hooks/useTasks';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';

function TaskDetails() {
    const { taskId } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useTask(taskId);

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                Loading task...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-600">
                    Failed to load task.
                </p>
            </div>
        );
    }

    const task = data?.data;

    if (!task) {
        return (
            <div className="p-8 text-center">
                Task not found.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            <Link
                to={`/projects/${task.project.id}`}
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back to project
            </Link>

            <div className="mt-6 rounded-xl bg-white p-6 shadow">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {task.title}
                        </h1>

                        {task.description && (
                            <p className="mt-3 text-gray-600">
                                {task.description}
                            </p>
                        )}
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                        {task.status_label}
                    </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Priority
                        </p>

                        <p className="font-medium">
                            {task.priority_label}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Assignee
                        </p>

                        <p className="font-medium">
                            {task.assignee?.name ?? 'Unassigned'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Creator
                        </p>

                        <p className="font-medium">
                            {task.creator?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Due date
                        </p>

                        <p
                            className={
                                task.is_overdue
                                    ? 'font-medium text-red-600'
                                    : 'font-medium'
                            }
                        >
                            {task.due_date_formatted ?? 'No due date'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Comments
                </h2>

                <div className="space-y-6">
                    <CommentForm taskId={task.id} />

                    <CommentList
                        comments={task.comments ?? []}
                    />
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;