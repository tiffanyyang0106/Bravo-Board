/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * DoingColumn Component:
 * Displays goals that are currently in progress.
 * Automatically closes dropdown when clicking outside.
 */

import React, { useState, useEffect, useRef } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BiPencil, BiUserCheck, BiTrash } from "react-icons/bi";
import EditGoal from "../../Modals/EditGoal";
import Card from "../../Shared/Card";
import deleteGoal from "../../../api/DeleteGoalAPI";
import DeleteConfirmModal from "../../Modals/DeleteConfirmModal";
import "../../../styles/DailyHabits.css";

const DoingColumn = ({ goals, onUpdateGoal, onDeleteGoal }) => {
  const [activeGoalId, setActiveGoalId] = useState(null); // ID of the active dropdown
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const dropdownRef = useRef(null); // Ref for dropdown menu

  const options = [
    { name: "Edit", className: "edit", icon: <BiPencil /> },
    { name: "Confirm Done", className: "confirm-done", icon: <BiUserCheck /> },
    { name: "Delete", className: "delete", icon: <BiTrash /> },
  ];

  const handleOptionClick = (option, goal) => {
    if (option.name === "Edit") {
      setSelectedGoal(goal);
      setEditModalOpen(true);
    } else if (option.name === "Delete") {
      setSelectedGoal(goal);
      setDeleteModalOpen(true);
    }

    setActiveGoalId(null); // Close dropdown after action
  };

  const handleSave = (updatedGoal) => {
    onUpdateGoal(updatedGoal);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveGoalId(null); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Droppable droppableId="doing">
      {(provided) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="column-title">Doing</h2>
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
                <p className="no-tasks">Empty progress, or all done?</p>
              )}
              {provided.placeholder}
            </div>
          </Scrollbar>

          {selectedGoal && (
            <EditGoal
              isOpen={isEditModalOpen}
              onClose={() => setEditModalOpen(false)}
              goal={selectedGoal}
              onSave={handleSave}
            />
          )}

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

export default DoingColumn;
