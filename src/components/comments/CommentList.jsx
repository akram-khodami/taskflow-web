import CommentCard from './CommentCard';

function CommentList({ comments }) {
    if (!comments.length) {
        return (
            <div className="rounded-xl bg-white p-6 text-center shadow">
                <p className="text-gray-500">
                    No comments yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </div>
    );
}

export default CommentList;