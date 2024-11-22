/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * DeleteConfirmModal Component:
 * Modal for confirming goal deletion. Provides a confirmation prompt and deletes the goal on user confirmation.
 */

import React from "react";
import Modal from "react-modal";
import "../../styles/Modal.css"; // Shared Modal styles

Modal.setAppElement("#root");

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, goal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Deletion"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <div>
        <h3>Delete Goal?</h3>
        <p>
          The <strong>{goal?.title}</strong> goal will be permanently deleted.
        </p>
        <div className="button-group">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
