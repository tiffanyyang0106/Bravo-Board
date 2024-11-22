/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * EditGoal Component:
 * Modal for editing an existing goal. Users can update the goal's title and description.
 * Interacts with the backend to save updates.
 */

import React, { useState } from "react";
import UpdateGoalAPI from "../../api/UpdateGoalAPI";
import "../../styles/Modal.css"; // Shared Modal styles

const EditGoal = ({ isOpen, onClose, goal, onSave }) => {
  const [title, setTitle] = useState(goal.title); // Goal title state
  const [description, setDescription] = useState(goal.description); // Goal description state
  const [isSaving, setIsSaving] = useState(false); // Tracks save operation status

  // Handle save action
  const handleSave = async () => {
    setIsSaving(true); // Indicate saving state
    const updatedGoal = { title, description }; // Prepare updated goal data

    try {
      const result = await UpdateGoalAPI(goal.id, updatedGoal); // Save updates to backend
      onSave(result); // Update parent state with the updated goal
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to update goal:", err);
    } finally {
      setIsSaving(false); // Reset saving state
    }
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h3>Edit Goal</h3>

        {/* Goal Title Input */}
        <div className="form-group">
          <label htmlFor="goal-title">Your Goal</label>
          <input
            type="text"
            id="goal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Goal Description Input */}
        <div className="form-group">
          <label htmlFor="goal-description">Details</label>
          <textarea
            id="goal-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
