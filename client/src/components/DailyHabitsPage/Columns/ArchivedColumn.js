/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * ArchivedColumn Component:
 * Displays archived goals and provides options to edit or delete goals.
 * Automatically closes dropdown when clicking outside.
 */

import React, { useState, useEffect, useRef } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BiPencil, BiTrash } from "react-icons/bi";
import EditGoal from "../../Modals/EditGoal";
import Card from "../../Shared/Card";
import deleteGoal from "../../../api/DeleteGoalAPI";
import DeleteConfirmModal from "../../Modals/DeleteConfirmModal";
import "../../../styles/DailyHabits.css";

const ArchivedColumn = ({ goals, onUpdateGoal, onDeleteGoal }) => {
  const [activeGoalId, setActiveGoalId] = useState(null); // ID of the active dropdown
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const dropdownRef = useRef(null); // Ref for dropdown menu

  // Available options for each goal
  const options = [
    { name: "Edit", className: "edit", icon: <BiPencil /> },
    { name: "Delete", className: "delete", icon: <BiTrash /> },
  ];

  // Handle option clicks (edit or delete)
  const handleOptionClick = (option, goal) => {
    if (option.name === "Edit") {
      setSelectedGoal(goal);
      setEditModalOpen(true);
    } else if (option.name === "Delete") {
      setSelectedGoal(goal);
      setDeleteModalOpen(true);
    }

    setActiveGoalId(null); // Close any active dropdown menu
  };

  // Save updated goal after editing
  const handleSave = (updatedGoal) => {
    onUpdateGoal(updatedGoal);
    setEditModalOpen(false);
    setSelectedGoal(null);
  };

  // Delete goal and update state
  const handleDelete = async () => {
    if (!selectedGoal) return;

    try {
      await deleteGoal(selectedGoal.id);
      onDeleteGoal(selectedGoal.id);
      setDeleteModalOpen(false);
      setSelectedGoal(null);
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveGoalId(null); // Close active dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                        <div
                          ref={activeGoalId === goal.id ? dropdownRef : null} // Attach ref to active dropdown
                        >
                          <Card
                            goal={goal}
                            activeGoalId={activeGoalId}
                            setActiveGoalId={setActiveGoalId}
                            options={options}
                            handleOptionClick={handleOptionClick}
                          />
                        </div>
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
