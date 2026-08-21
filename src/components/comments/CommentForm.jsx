import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { commentSchema } from '../../schemas/comment';
import { useCreateComment } from '../../hooks/useComments';
import { applyApiValidationErrors } from '../../utils/apiError';

function CommentForm({ taskId }) {
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
            parent_id: '',
        },
    });

    const {
        mutateAsync: createComment,
        isPending,
    } = useCreateComment();

    const onSubmit = async (data) => {
        try {
            await createComment({
                taskId,
                data: {
                    body: data.body,
                },
            });

            reset();
        } catch (error) {
            applyApiValidationErrors(error, setError);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-white p-5 shadow"
        >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Add Comment
            </h3>

            <textarea
                {...register('body')}
                rows={4}
                placeholder="Write your comment..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />

            {errors.body && (
                <p className="mt-1 text-sm text-red-600">
                    {errors.body.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="mt-3 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Adding...' : 'Add Comment'}
            </button>
        </form>
    );
}

export default CommentForm;