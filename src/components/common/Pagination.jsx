const Pagination = ({
    currentPage,
    lastPage,
    onPageChange,
}) => {
    if (lastPage <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];

        if (lastPage <= 7) {
            for (let page = 1; page <= lastPage; page++) {
                pages.push(page);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 4) {
            pages.push('...');
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(lastPage - 1, currentPage + 1);

        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        if (currentPage < lastPage - 3) {
            pages.push('...');
        }

        pages.push(lastPage);

        return pages;
    };

    return (
        <div className="mt-6 flex items-center justify-center gap-1">
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            {getPageNumbers().map((page, index) =>
                page === '...' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="px-2 text-sm text-gray-400"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`min-w-9 rounded-lg border px-3 py-2 text-sm transition ${page === currentPage
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;