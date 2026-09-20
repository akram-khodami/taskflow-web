import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useTask } from '../hooks/useTasks';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';

function TaskDetails() {
    const [showForm, setShowForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const { taskId } = useParams();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    } = useTask(taskId);

    if (isLoading) return <LoadingState message="Loading task..." />;
    if (isError) return <ErrorState error={error.message} />;

    const task = data?.data;

    if (!task) return <EmptyState message="Task not found." />;

    const closeForm = () => {
        setEditingRecord(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">

                <div className="mt-8 flex items-center justify-between">
                    <PageHeader
                        title="Task"
                        description="Manage Task and their comments."
                        isUpdating={isFetching}
                    />
                </div>

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
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Comments</h2>

                        {!showForm && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingRecord(null);
                                    setShowForm(true);
                                }}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            >
                                Add Comment
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {showForm && (
                            <CommentForm
                                taskId={task.id}
                                comment={editingRecord}
                                onSuccess={closeForm}
                                onCancel={closeForm}
                            />
                        )}

                        <CommentList
                            comments={task.comments ?? []}
                            taskId={task.id}
                            onEdit={(comment) => {
                                setEditingRecord(comment);
                                setShowForm(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;