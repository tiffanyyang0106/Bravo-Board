import React, { useState, useEffect } from "react";
import {
  BiClipboard,
  BiStar,
  BiSolidStar,
  BiChevronDown,
} from "react-icons/bi";
import CreateGoalModal from "../CreateGoal";
import ToDoColumn from "./ToDoColumn";
import DoingColumn from "./DoingColumn";
import DoneColumn from "./DoneColumn";
import ArchivedColumn from "./ArchivedColumn"; // Import the new component
import "../../styles/DailyHabits.css";

const DailyHabitsPage = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Add a new goal
  const addGoalHandler = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  // Update an existing goal
  const onUpdateGoal = (updatedGoal) => {
    console.log("onUpdateGoal called...");
    console.log("Updated Goal:", updatedGoal);

    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );

    console.log("Goals after update:", goals);
  };

  // Close the create goal modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="daily-habits">
      {/* Header */}
      <div className="daily-habits-header">
        <div className="daily-habits-header-bg"></div> {/* Background layer */}
        <div className="daily-habits-title-container">
          <div className="icon-container">
            <BiClipboard className="icon clipboard-icon" />
          </div>
          <h1 className="daily-habits-title">Daily Habits</h1>
          <div className="icon-container">
            {isFavorite ? (
              <BiSolidStar
                className="icon star-icon"
                onClick={() => setIsFavorite(false)} // Toggle to empty
              />
            ) : (
              <BiStar
                className="icon star-icon"
                onClick={() => setIsFavorite(true)} // Toggle to filled
              />
            )}
          </div>
          <div className="icon-container">
            <BiChevronDown className="icon chevron-icon" />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary daily-habits-add-goal"
          onClick={() => setModalOpen(true)}
        >
          + Create Goal
        </button>
      </div>

      {/* Modal */}
      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        addGoalHandler={addGoalHandler}
      />

      {/* Goals Columns */}
      <div className="daily-habits-columns">
        <ToDoColumn
          goals={goals.filter((goal) => goal.status === "to do")}
          onUpdateGoal={onUpdateGoal}
        />
        <DoingColumn
          goals={goals.filter((goal) => goal.status === "doing")}
          onUpdateGoal={onUpdateGoal}
        />
        <DoneColumn
          goals={goals.filter((goal) => goal.status === "done")}
          onUpdateGoal={onUpdateGoal}
        />
        <ArchivedColumn
          goals={goals.filter((goal) => goal.status === "archived")}
          onUpdateGoal={onUpdateGoal}
        />
      </div>
    </div>
  );
};

export default DailyHabitsPage;
