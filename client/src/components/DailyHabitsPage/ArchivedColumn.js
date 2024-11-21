import React from "react";
import "../../styles/DailyHabits.css";

const ArchivedColumn = ({ goals }) => {
  return (
    <div className="column">
      <h2 className="column-title">Archived</h2>
      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.id} className="goal">
            <h5 className="goal-title">{goal.title}</h5>
            <p className="goal-description">{goal.description}</p>
          </div>
        ))
      ) : (
        <p className="no-tasks">
          Store postponed or already achieved goals here.
        </p>
      )}
    </div>
  );
};

export default ArchivedColumn;
