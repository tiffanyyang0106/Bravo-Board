import React from "react";
import Modal from "react-modal";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

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
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.goalTitle, // Map frontend fields to backend expectations
          description: data.goalDescription,
          status: "to do", // Example status field, if required
        }),
      };

      const response = await fetch("/api/goals/goals", requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Goal successfully created:", result);
      addGoalHandler(result); // Add the created goal to the state in DailyHabitsPage
      reset(); // Reset the form fields
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error creating goal:", err);
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (!data.goalTitle) return;
    await createGoal(data); // Call createGoal after validation
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Goal Modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <h5>Create New Goal</h5>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="goalTitle">
          <Form.Label>Your Goal</Form.Label>
          <Form.Control
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
        </Form.Group>

        <Form.Group className="mb-3" controlId="goalDescription">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
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
        </Form.Group>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add Goal
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateGoalModal;
