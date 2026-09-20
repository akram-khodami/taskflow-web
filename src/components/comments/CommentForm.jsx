import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { commentSchema } from '../../schemas/comment';
import { useCreateComment, useComment, useUpdateComment } from '../../hooks/useComments';
import { applyApiValidationErrors } from '../../utils/apiError';

function CommentForm({ taskId, comment, onSuccess, onCancel }) {
    const isEditMode = Boolean(comment?.id);

    const {
        data: commentData,
        isLoading,
    } = useComment(comment?.id, {
        enabled: isEditMode,
    });

    const {
        mutateAsync: createComment,
        isPending: isCreating,
        isError: isCreatingError,
    } = useCreateComment();

    const {
        mutateAsync: updateComment,
        isPending: isUpdating,
        isError: isUpdatingError,
    } = useUpdateComment();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            body: '',
        },
    });

    const isPending = isCreating || isUpdating;
    const hasError = isCreatingError || isUpdatingError;

    // Reset form when comment data changes, or when switching to create mode
    useEffect(() => {
        if (!isEditMode) {
            reset({ body: '' });
            return;
        }

        if (!commentData?.data) return;

        const c = commentData.data;
        reset({
            body: c.body ?? '',
        });
    }, [commentData, isEditMode, reset]);

    if (isEditMode && isLoading) {
        return (
            <div className="rounded-xl bg-white p-6 shadow mb-6">
                Loading comment data...
            </div>
        );
    }

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await updateComment({
                    id: comment.id,
                    taskId,   
                    data: { body: data.body },
                });
            } else {
                await createComment({
                    taskId,
                    data: { body: data.body },
                });
            }
            onSuccess?.();
        } catch (error) {
            applyApiValidationErrors(error, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-white p-5 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {isEditMode ? 'Edit Comment' : 'Add Comment'}
            </h3>

            <textarea
                {...register('body')}
                rows={4}
                placeholder="Write your comment..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
            {errors.body && (
                <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
            )}

            {hasError && (
                <p className="mt-2 text-sm text-red-600">
                    Something went wrong. Please try again.
                </p>
            )}

            <div className="mt-3 flex gap-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                    {isPending
                        ? (isEditMode ? 'Updating...' : 'Adding...')
                        : (isEditMode ? 'Edit Comment' : 'Add Comment')}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="rounded-lg px-5 py-2.5">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default CommentForm;