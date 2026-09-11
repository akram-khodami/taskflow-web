import { useDeleteTask } from '../../hooks/useTasks';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../common/ActionButtons';

function TaskCard({ task, projectId, onEdit }) {

    const {
        mutateAsync: deleteTask,
        isPending,
    } = useDeleteTask();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTask(task.id);
        } catch (error) {
            console.error('Delete task error:', error);
        }
    };

    return (

        <div className="block rounded-xl bg-white p-5 shadow transition hover:shadow-md">
            {/* <Link
            to={`/projects/${projectId}/tasks/${task.id}`}
            className="block rounded-xl bg-white p-5 shadow transition hover:shadow-md"
         > */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className="mt-2 text-sm text-gray-600">
                            {task.description}
                        </p>
                    )}
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                    {task.status_label}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>
                    Priority: {task.priority_label}
                </span>

                <span>
                    Assignee: {task.assignee?.name ?? 'Unassigned'}
                </span>

                {task.due_date_formatted && (
                    <span
                        className={
                            task.is_overdue
                                ? 'font-medium text-red-600'
                                : ''
                        }
                    >
                        Due: {task.due_date_formatted}
                    </span>
                )}

                <span>
                    Comments: {task.comments_count}
                </span>

                <ActionButtons
                    onEdit={() => onEdit(task)}
                    onDelete={() => handleDelete()}
                    isDeleting={isPending}
                />

                <Link
                    to={`/projects/${projectId}/tasks/${task.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    View
                </Link>

            </div>
            {/* </Link> */}
        </div >
    );
}

export default TaskCard;