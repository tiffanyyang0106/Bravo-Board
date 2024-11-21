import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BiPencil, BiTrash } from "react-icons/bi";
import EditGoal from "../../Modals/EditGoal";
import Card from "../../Shared/Card";
import deleteGoal from "../../../api/DeleteGoalAPI";
import DeleteConfirmModal from "../../Modals/DeleteConfirmModal";
import "../../../styles/DailyHabits.css";

const ArchivedColumn = ({ goals, onUpdateGoal, onDeleteGoal }) => {
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const options = [
    { name: "Edit", className: "edit", icon: <BiPencil /> },
    { name: "Delete", className: "delete", icon: <BiTrash /> },
  ];

  const handleOptionClick = (option, goal) => {
    console.log(`Option '${option.name}' selected for goal:`, goal);

    if (option.name === "Edit") {
      setSelectedGoal(goal);
      setEditModalOpen(true);
    } else if (option.name === "Delete") {
      setSelectedGoal(goal);
      setDeleteModalOpen(true);
    }

    setActiveGoalId(null); // Close the menu after selection
  };

  const handleSave = (updatedGoal) => {
    console.log("Saving updated goal:", updatedGoal);
    onUpdateGoal(updatedGoal); // Call the parent handler to update the goal
    setEditModalOpen(false);
    setSelectedGoal(null);
  };

  const handleDelete = async () => {
    if (!selectedGoal) return;

    try {
      await deleteGoal(selectedGoal.id); // Call API to delete the goal
      onDeleteGoal(selectedGoal.id); // Update parent state after deletion
      setDeleteModalOpen(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  return (
    <Droppable droppableId="archived">
      {(provided) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="column-title">Archived</h2>
          <Scrollbar style={{ height: 350 }} noScrollX>
            <div className="goals-container">
              {goals.length > 0 ? (
                goals.map((goal, index) => (
                  <Draggable
                    key={goal.id}
                    draggableId={goal.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          goal={goal}
                          activeGoalId={activeGoalId}
                          setActiveGoalId={setActiveGoalId}
                          options={options}
                          handleOptionClick={handleOptionClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="no-tasks">
                  Store postponed or already achieved goals here.
                </p>
              )}
              {provided.placeholder}
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

          {/* Delete Confirm Modal */}
          {selectedGoal && (
            <DeleteConfirmModal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleDelete}
              goal={selectedGoal}
            />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default ArchivedColumn;
