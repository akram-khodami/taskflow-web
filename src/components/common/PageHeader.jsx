function PageHeader({ title, description, isUpdating = false }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h1>

                {isUpdating && (
                    <span className="text-sm text-gray-500">
                        Updating...
                    </span>
                )}
            </div>

            <p className="mt-1 text-gray-600">
                {description}
            </p>
        </div>
    );
}

export default PageHeader;