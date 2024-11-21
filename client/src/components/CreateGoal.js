import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "../styles/CreateGoal.css"; // Ensure this matches your directory structure

// Required for accessibility
Modal.setAppElement("#root");

const CreateGoalModal = ({ isOpen, onClose, addGoalHandler }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle goal creation
  const createGoal = async (data) => {
    try {
      const response = await fetch("/api/goals/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.goalTitle,
          description: data.goalDescription,
          status: "to do", // Default status
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      addGoalHandler(result); // Add the new goal to the state
      reset(); // Reset the form fields
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error creating goal:", err);
    }
  };

  // Form submission handler
  const onSubmit = (data) => {
    if (!data.goalTitle) return;
    createGoal(data); // Call createGoal after validation
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Goal Modal"
      overlayClassName="create-goal-overlay"
      className="create-goal-modal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="goalTitle">Your Goal</label>
          <input
            id="goalTitle"
            type="text"
            placeholder="Drink more water"
            {...register("goalTitle", {
              required: "Goal title is required",
              maxLength: {
                value: 255,
                message: "Goal title should be less than 255 characters",
              },
            })}
            className={`placeholder-gray ${
              errors.goalTitle ? "is-invalid" : ""
            }`}
          />
          {errors.goalTitle && (
            <div className="invalid-feedback">{errors.goalTitle.message}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="goalDescription">Details</label>
          <textarea
            id="goalDescription"
            placeholder="Drink 1 glass of water with each meal"
            {...register("goalDescription", {
              maxLength: {
                value: 8000,
                message: "Details should be less than 8000 characters",
              },
            })}
            className={`placeholder-gray ${
              errors.goalDescription ? "is-invalid" : ""
            }`}
          />
          {errors.goalDescription && (
            <div className="invalid-feedback">
              {errors.goalDescription.message}
            </div>
          )}
        </div>

        <div className="button-group">
          <button type="button" className="btn cancel" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="btn save">
            Add Goal
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGoalModal;
