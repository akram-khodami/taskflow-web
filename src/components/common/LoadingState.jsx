import React from 'react';

const LoadingState = ({ message = 'Loading...' }) => {
    return (
        <div className="p-8">
            {message}
        </div>
    );
};

export default LoadingState;