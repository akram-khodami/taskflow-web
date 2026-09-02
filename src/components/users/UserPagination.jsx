const UserPagination = ({
    currentPage,
    lastPage,
    onPageChange,
}) => {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="mt-4 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            {Array.from(
                { length: lastPage },
                (_, index) => index + 1
            ).map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => onPageChange(pageNumber)}
                    className={`rounded-lg border px-3 py-2 text-sm ${pageNumber === currentPage
                            ? 'bg-gray-900 text-white'
                            : 'bg-white'
                        }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default UserPagination;