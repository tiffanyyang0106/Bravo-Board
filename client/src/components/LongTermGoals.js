import React, { useState } from "react";
import CreateGoalModal from "./Modals/CreateGoal";

const LongTermGoalsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="long-term-goals">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Long Term Goals</h1>
        {/* Button to trigger the modal */}
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
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default LongTermGoalsPage;
