/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * CreateGoalModal Component:
 * Modal for adding new goals. Users can enter a title and optional description for the goal.
 * Validates input and interacts with the backend to save the new goal.
 */

import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import createGoalAPI from "../../api/CreateGoalAPI";
import "../../styles/Modal.css"; // Shared Modal styles

Modal.setAppElement("#root");

const CreateGoalModal = ({ isOpen, onClose, addGoalHandler }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.goalTitle) return;

    try {
      const newGoal = await createGoalAPI(data);
      addGoalHandler(newGoal); // Update parent state with the new goal
      reset(); // Reset form fields
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to create goal:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Goal Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Goal Title Input */}
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

        {/* Goal Description Input */}
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

        {/* Buttons */}
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
