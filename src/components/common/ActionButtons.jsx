import PropTypes from 'prop-types';
import { Button } from './Button';

export function ActionButtons({ onEdit, onDelete, isDeleting = false }) {
    return (
        <div className="flex gap-2">
            <Button
                variant="secondary"
                size="sm"
                onClick={onEdit}
            >
                ✏️ Edit
            </Button>
            <Button
                variant="danger"
                size="sm"
                onClick={onDelete}
                isLoading={isDeleting}
            >
                🗑️ Delete
            </Button>
        </div>
    );
}

ActionButtons.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool,
};