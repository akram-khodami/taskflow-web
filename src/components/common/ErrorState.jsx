import React from 'react';

const ErrorState = ({ error }) => {
    return (
        <div className="p-6 text-red-600">
            Error: {error}
        </div>
    );
};

export default ErrorState;