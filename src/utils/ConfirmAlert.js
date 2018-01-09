import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const NOOP = () => {};

export default (title, message, onConfirm = NOOP, onCancel = NOOP) => {
  confirmAlert({
    title, // Title dialog
    message, // Message dialog
    // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
    confirmLabel: 'Confirm', // Text button confirm
    cancelLabel: 'Cancel', // Text button cancel
    onConfirm, // Action after Confirm
    onCancel // Action after Cancel
  });
};
