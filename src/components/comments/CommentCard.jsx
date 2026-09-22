import { ActionButtons } from '../common/ActionButtons';
import { useDeleteComment } from '../../hooks/useComments';

function CommentCard({ comment, taskId, onEdit }) {
    const {
        mutateAsync: deleteComment,
        isPending,
    } = useDeleteComment();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this comment?'
        );
        if (!confirmed) return;

        try {
            await deleteComment({
                id: comment.id,
                taskId: taskId ?? comment.task_id,
            });
        } catch (error) {
            console.error('Delete comment error:', error);//todo:handle better
        }
    };

    const canEdit = comment.can_edit;
    const canDelete = comment.can_delete;

    return (
        <article className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="font-semibold text-gray-900">
                        {comment.user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                        {comment.created_at_diff}
                    </p>
                </div>

                <div className="flex gap-2">
                    {(canEdit || canDelete) && (
                        <ActionButtons
                            onEdit={canEdit && onEdit ? () => onEdit(comment) : undefined}
                            onDelete={canDelete ? handleDelete : undefined}
                            isDeleting={isPending}
                        />
                    )}
                </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-gray-700">
                {comment.body}
            </p>
        </article>
    );
}

export default CommentCard;