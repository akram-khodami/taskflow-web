const EmptyState = ({ message = 'Not found.' }) => {
    return (
        <div className="p-8 text-center">
            {message}
        </div>
    );
};
export default EmptyState;