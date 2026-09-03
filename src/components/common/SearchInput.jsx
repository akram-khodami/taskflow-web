function SearchInput({ value, onChange, placeholder = 'Search...' }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 sm:max-w-md"
        />
    );
}

export default SearchInput;