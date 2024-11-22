/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * Card Component:
 * Represents a goal with its title, description, and available options (Edit, Delete, etc.).
 * Shows a dropdown menu for goal-specific actions.
 */

import React from "react";
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from "react-icons/bi";
import "../../styles/DailyHabits.css";

const Card = ({
  goal, // Goal object with title, description, and other properties
  activeGoalId, // ID of the currently active (dropdown open) goal
  setActiveGoalId, // Function to set the active goal ID
  options, // List of options (Edit, Delete, etc.)
  handleOptionClick, // Function to handle clicks on dropdown options
}) => {
  return (
    <div className="goal">
      {/* Goal Header with Title and Dropdown Icon */}
      <div className="goal-header">
        <h5 className="goal-title">{goal.title}</h5>
        <div
          className="goal-options-icon-container"
          onClick={() =>
            setActiveGoalId((prev) => (prev === goal.id ? null : goal.id))
          }
        >
          {activeGoalId === goal.id ? (
            <BiDotsVerticalRounded className="goal-options-icon" />
          ) : (
            <BiDotsHorizontalRounded className="goal-options-icon" />
          )}
        </div>
      </div>

      {/* Goal Description */}
      <p className="goal-description">{goal.description}</p>

      {/* Options Dropdown Menu */}
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
  );
};

export default Card;
