function SortSelect({
    sortBy,
    sortOrder,
    onSortByChange,
    onSortOrderChange,
    options = [],
}) {
    return (
        <div className="flex items-center gap-2">
            <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <button
                type="button"
                onClick={() =>
                    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
                }
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
                {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
        </div>
    );
}

export default SortSelect;