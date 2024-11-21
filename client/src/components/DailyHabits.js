import React, { useState, useEffect } from "react";
import CreateGoalModal from "./CreateGoal";
import Goal from "./Goals";

const DailyHabitsPage = () => {
  const [goals, setGoals] = useState([]); // Ensure it's initialized as an array
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch goals from the backend
  const fetchGoals = () => {
    fetch("/api/goals/goals")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGoals(data);
        } else {
          console.error("Unexpected data format:", data);
          setGoals([]);
        }
      })
      .catch((err) => console.error("Error fetching goals:", err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Add a new goal to the state after successful creation
  const addGoalHandler = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="daily-habits">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Daily Habits</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          + Create Goal
        </button>
      </div>

      {/* Modal */}
      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        addGoalHandler={addGoalHandler} // Pass the handler to the modal
      />

      {/* Goals List */}
      <div className="goals">
        <h2>List of Goals</h2>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <Goal
              key={index}
              title={goal.title}
              description={goal.description}
            />
          ))
        ) : (
          <p>No goals found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default DailyHabitsPage;
