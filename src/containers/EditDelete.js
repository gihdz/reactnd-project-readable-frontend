import React from 'react';
import PropTypes from 'prop-types';
import ConfirmAlert from '../utils/ConfirmAlert';

class EditDelete extends React.Component {
  deleteWarning = e => {
    e.preventDefault();
    const { confirmTitle, confirmMessage } = this.props;
    ConfirmAlert(confirmTitle, confirmMessage, () => {
      const { onDelete } = this.props;
      if (onDelete) onDelete();
    });
  };
  render() {
    const { onEdit, editTooltip, deleteTooltip } = this.props;

    return (
      <div className="action-group">
        <a href="#delete-item" data-tip={editTooltip} onClick={onEdit}>
          <i className="material-icons">mode_edit</i>
        </a>
        <a
          data-tip={deleteTooltip}
          href="#delete-item"
          onClick={this.deleteWarning}
        >
          <i className="material-icons">remove_circle</i>
        </a>
      </div>
    );
  }
}

EditDelete.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

EditDelete.defaultProps = {
  editTooltip: 'Edit',
  deleteTooltip: 'Delete',
  confirmTitle: 'Confirm Delete',
  confirmMessage: 'Sure you want to delete this?'
};

export default EditDelete;
