import React from "react";
import "../../styles/DailyHabits.css";

const DoneColumn = ({ goals }) => {
  return (
    <div className="column">
      <h2 className="column-title">Done</h2>
      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.id} className="goal">
            <h5 className="goal-title">{goal.title}</h5>
            <p className="goal-description">{goal.description}</p>
          </div>
        ))
      ) : (
        <p className="no-tasks">Drag a goal here to mark done!</p>
      )}
    </div>
  );
};

export default DoneColumn;
