// components/Card.js
import React from "react";
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from "react-icons/bi";
import "../../styles/DailyHabits.css";

const Card = ({
  goal,
  activeGoalId,
  setActiveGoalId,
  options,
  handleOptionClick,
}) => {
  return (
    <div className="goal">
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
  );
};

export default Card;
