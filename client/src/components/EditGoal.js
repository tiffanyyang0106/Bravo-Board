import React, { useState } from "react";
import updateGoal from "./api/UpdateGoal"; // Import the updateGoal API function
import "../styles/EditGoal.css";

const EditGoal = ({ isOpen, onClose, goal, onSave }) => {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [isSaving, setIsSaving] = useState(false); // Optional: Loading state

  const handleSave = async () => {
    console.log("Initiating handleSave...");
    console.log("Title:", title);
    console.log("Description:", description);

    setIsSaving(true); // Start loading
    const updatedGoal = { title, description };

    try {
      console.log("Calling updateGoal API...");
      const result = await updateGoal(goal.id, updatedGoal); // Call API
      console.log("Goal updated successfully:", result);

      onSave(result); // Pass updated goal data to the parent component
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to update goal:", err);
    } finally {
      setIsSaving(false); // Stop loading
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-goal-overlay" onClick={onClose}>
      <div
        className="edit-goal-modal"
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
