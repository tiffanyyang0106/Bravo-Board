import React, { useState } from "react";
import UpdateGoalAPI from "../../api/UpdateGoalAPI";
import "../../styles/Modal.css"; // Use shared Modal styles

const EditGoal = ({ isOpen, onClose, goal, onSave }) => {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    console.log("Initiating handleSave...");
    console.log("Title:", title);
    console.log("Description:", description);

    setIsSaving(true);
    const updatedGoal = { title, description };

    try {
      console.log("Calling UpdateGoalAPI...");
      const result = await UpdateGoalAPI(goal.id, updatedGoal);
      console.log("Goal updated successfully:", result);

      onSave(result);
      onClose();
    } catch (err) {
      console.error("Failed to update goal:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h3>Edit Goal</h3>
        <div className="form-group">
          <label htmlFor="goal-title">Your Goal</label>
          <input
            type="text"
            id="goal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="goal-description">Details</label>
          <textarea
            id="goal-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
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
