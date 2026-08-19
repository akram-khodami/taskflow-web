export function getApiErrorMessage(error) {
    return (
        error.response?.data?.message ||
        'Something went wrong. Please try again.'
    );
}

export function getApiValidationErrors(error) {
    return error.response?.data?.errors || {};
}

export function applyApiValidationErrors(error, setError) {
    const errors = getApiValidationErrors(error);

    Object.entries(errors).forEach(([field, messages]) => {
        setError(field, {
            type: 'server',
            message: messages[0],
        });
    });
}