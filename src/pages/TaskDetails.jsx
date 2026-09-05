import { Link, useParams } from 'react-router-dom';

import { useTask } from '../hooks/useTasks';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import BackButton from '../components/common/BackButton';

function TaskDetails() {

    const { taskId } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useTask(taskId);

    if (isLoading) {
        return <LoadingState message="Loading task..." />
    }

    if (isError) {
        return <ErrorState error="Failed to load tasks." />
    }

    const task = data?.data;

    if (!task) {
        return <EmptyState message='Task not found.' />
    }

    return (
        <div className="mx-auto max-w-4xl p-6">

            <BackButton to={`/projects/${task.project.id}`} label="Back to project" />

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