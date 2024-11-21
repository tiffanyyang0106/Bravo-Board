import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  BiClipboard,
  BiStar,
  BiSolidStar,
  BiChevronDown,
} from "react-icons/bi";
import CreateGoalModal from "../Modals/CreateGoal";
import ToDoColumn from "./Columns/ToDoColumn";
import DoingColumn from "./Columns/DoingColumn";
import DoneColumn from "./Columns/DoneColumn";
import ArchivedColumn from "./Columns/ArchivedColumn";
import fetchGoals from "../../api/FetchGoalsAPI";
import UpdateGoalOrderAPI from "../../api/UpdateGoalOrderAPI";
import "../../styles/DailyHabits.css";

const DailyHabitsPage = () => {
  const [goalsByStatus, setGoalsByStatus] = useState({
    "to do": [],
    doing: [],
    done: [],
    archived: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const fetchedGoals = await fetchGoals();
        const groupedGoals = fetchedGoals.reduce(
          (acc, goal) => {
            acc[goal.status].push(goal);
            return acc;
          },
          { "to do": [], doing: [], done: [], archived: [] }
        );
        setGoalsByStatus(groupedGoals);
      } catch (error) {
        console.error("Error loading goals:", error);
      }
    };

    loadGoals();
  }, []);

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return; // Dragged outside of a droppable area

    // Extract source and destination details
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    // If the item is moved within the same column
    if (sourceStatus === destStatus) {
      const updatedGoals = Array.from(goalsByStatus[sourceStatus]);
      const [movedGoal] = updatedGoals.splice(source.index, 1);
      updatedGoals.splice(destination.index, 0, movedGoal);

      setGoalsByStatus((prev) => ({
        ...prev,
        [sourceStatus]: updatedGoals.map((goal, index) => ({
          ...goal,
          order: index,
        })),
      }));
    } else {
      // Moving across columns
      const sourceGoals = Array.from(goalsByStatus[sourceStatus]);
      const destGoals = Array.from(goalsByStatus[destStatus]);

      const [movedGoal] = sourceGoals.splice(source.index, 1);
      movedGoal.status = destStatus; // Update the status for the goal
      destGoals.splice(destination.index, 0, movedGoal);

      setGoalsByStatus((prev) => ({
        ...prev,
        [sourceStatus]: sourceGoals.map((goal, index) => ({
          ...goal,
          order: index,
        })),
        [destStatus]: destGoals.map((goal, index) => ({
          ...goal,
          order: index,
        })),
      }));
    }

    // Send updated order and status to backend
    try {
      const updatedGoals = Object.values(goalsByStatus).flat();
      const goalOrderPayload = updatedGoals.map((goal, index) => ({
        id: goal.id,
        order: index,
        status: goal.status,
      }));

      await UpdateGoalOrderAPI(goalOrderPayload);
      console.log("Order updated successfully on the backend.");
    } catch (err) {
      console.error("Failed to update goal order:", err);
    }
  };

  const addGoalHandler = (newGoal) => {
    setGoalsByStatus((prev) => ({
      ...prev,
      [newGoal.status]: [...prev[newGoal.status], newGoal],
    }));
  };

  const onUpdateGoal = (updatedGoal) => {
    setGoalsByStatus((prev) => ({
      ...prev,
      [updatedGoal.status]: prev[updatedGoal.status].map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ),
    }));
  };

  const onDeleteGoal = (goalId) => {
    setGoalsByStatus((prev) => {
      const newGoalsByStatus = {};
      for (const [status, goals] of Object.entries(prev)) {
        newGoalsByStatus[status] = goals.filter((goal) => goal.id !== goalId);
      }
      return newGoalsByStatus;
    });
  };

  return (
    <div className="daily-habits">
      <div className="daily-habits-header">
        <div className="daily-habits-header-bg"></div>
        <div className="daily-habits-title-container">
          <div className="icon-container">
            <BiClipboard className="icon clipboard-icon" />
          </div>
          <h1 className="daily-habits-title">Daily Habits</h1>
          <div className="icon-container">
            {isFavorite ? (
              <BiSolidStar
                className="icon star-icon"
                onClick={() => setIsFavorite(false)}
              />
            ) : (
              <BiStar
                className="icon star-icon"
                onClick={() => setIsFavorite(true)}
              />
            )}
          </div>
          <div className="icon-container">
            <BiChevronDown className="icon chevron-icon" />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary daily-habits-add-goal"
          onClick={() => setModalOpen(true)}
        >
          + Create Goal
        </button>
      </div>

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addGoalHandler={addGoalHandler}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="daily-habits-columns">
          <ToDoColumn
            goals={goalsByStatus["to do"]}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
          <DoingColumn
            goals={goalsByStatus["doing"]}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
          <DoneColumn
            goals={goalsByStatus["done"]}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
          <ArchivedColumn
            goals={goalsByStatus["archived"]}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default DailyHabitsPage;
