export function getApiErrorMessage(error) {
    return (
        error.response?.data?.message ||
        'Something went wrong. Please try again.'
    );
}

export function getApiValidationErrors(error) {
    return error.response?.data?.errors || {};
}

export function applyApiErrors(error, setError) {
    const errors = getApiValidationErrors(error);

    if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, messages]) => {
            setError(field, {
                type: 'server',
                message: messages[0],
            });
        });

        return;
    }

    setError('root', {
        type: 'server',
        message: getApiErrorMessage(error),
    });
}