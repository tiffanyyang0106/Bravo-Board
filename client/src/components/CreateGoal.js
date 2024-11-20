import React from "react";

const CreateGoalModal = () => {
  return (
    <div
      className="modal fade"
      id="createGoalModal"
      tabIndex="-1"
      aria-labelledby="createGoalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createGoalModalLabel">
              Create New Goal
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="goalTitle" className="form-label">
                  Goal Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="goalTitle"
                  placeholder="Enter goal title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="goalDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="goalDescription"
                  rows="3"
                  placeholder="Describe your goal"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;
