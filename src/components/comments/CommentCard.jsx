function CommentCard({ comment }) {
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
                    {comment.can_edit && (
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Edit
                        </button>
                    )}

                    {comment.can_delete && (
                        <button
                            type="button"
                            className="text-sm text-red-600 hover:underline"
                        >
                            Delete
                        </button>
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