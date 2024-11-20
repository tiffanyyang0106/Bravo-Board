import React from "react";
import CreateGoalModal from "./CreateGoal";

const LongTermGoalsPage = () => {
  return (
    <div className="long-term-goals">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Long Term Goals</h1>
        {/* Button to trigger the modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createGoalModal"
        >
          + Create Goal
        </button>
      </div>

      {/* Modal */}
      <CreateGoalModal />
    </div>
  );
};

export default LongTermGoalsPage;
