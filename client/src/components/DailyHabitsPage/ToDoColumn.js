import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import {
  BiDotsHorizontalRounded,
  BiDotsVerticalRounded,
  BiPencil,
  BiUserCheck,
  BiTrash,
} from "react-icons/bi";
import EditGoal from "../EditGoal"; // Import EditGoal component
import "../../styles/DailyHabits.css";

const ToDoColumn = ({ goals, onUpdateGoal }) => {
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const options = [
    { name: "Edit", className: "edit", icon: <BiPencil /> },
    {
      name: "Confirm Done",
      className: "confirm-done",
      icon: <BiUserCheck />,
    },
    { name: "Delete", className: "delete", icon: <BiTrash /> },
  ];

  const handleOptionClick = (option, goal) => {
    console.log(`Option '${option.name}' selected for goal:`, goal);

    if (option.name === "Edit") {
      console.log("Opening Edit modal for goal:", goal);
      setSelectedGoal(goal);
      setEditModalOpen(true);
    } else {
      console.log(`Other action selected: ${option.name}`);
    }

    setActiveGoalId(null); // Close the menu after selection
  };

  const handleSave = (updatedGoal) => {
    console.log("Saving updated goal:", updatedGoal);
    onUpdateGoal(updatedGoal); // Call the parent handler to update the goal
    setEditModalOpen(false);
    setSelectedGoal(null);
  };

  return (
    <div className="column">
      <h2 className="column-title">To do</h2>
      <Scrollbar style={{ height: 350 }} noScrollX>
        <div className="goals-container">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div key={goal.id} className="goal">
                <div className="goal-header">
                  <h5 className="goal-title">{goal.title}</h5>
                  <div
                    className="goal-options-icon-container"
                    onClick={() =>
                      setActiveGoalId((prev) =>
                        prev === goal.id ? null : goal.id
                      )
                    }
                  >
                    {activeGoalId === goal.id ? (
                      <BiDotsVerticalRounded className="goal-options-icon" />
                    ) : (
                      <BiDotsHorizontalRounded className="goal-options-icon" />
                    )}
                  </div>
                </div>
                <p className="goal-description">{goal.description}</p>

                {/* Options Menu */}
                {activeGoalId === goal.id && (
                  <div className="options-menu">
                    {options.map((option) => (
                      <div
                        key={option.name}
                        className={`options-menu-item ${option.className}`}
                        onClick={() => handleOptionClick(option, goal)}
                      >
                        <div className="options-menu-icon">{option.icon}</div>
                        <span>{option.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-tasks">Wow such empty.</p>
          )}
        </div>
      </Scrollbar>

      {/* Edit Goal Modal */}
      {selectedGoal && (
        <EditGoal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          goal={selectedGoal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ToDoColumn;
