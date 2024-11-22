/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * LongTermGoalsPage Component:
 * A central page for managing long term goals organized into columns (To Do, Doing, Done, and Archived).
 * Features drag-and-drop functionality, goal creation, editing, and deletion.
 * Integrates with OpenAI for celebratory messages upon goal completion.
 */

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BiHome, BiStar, BiSolidStar, BiChevronDown } from "react-icons/bi";
import CreateGoalModal from "../Modals/CreateGoal";
import ToDoColumn from "./Columns/ToDoColumn";
import DoingColumn from "./Columns/DoingColumn";
import DoneColumn from "./Columns/DoneColumn";
import ArchivedColumn from "./Columns/ArchivedColumn";
import fetchGoals from "../../api/FetchGoalsAPI";
import UpdateGoalOrderAPI from "../../api/UpdateGoalOrderAPI";
import fetchOpenAIResponse from "../../api/OpenAIAPI";
import ChatBoard from "./ChatBoard";
import "../../styles/DailyHabits.css";

const LongTermGoalsPage = () => {
  // State management
  const [goalsByStatus, setGoalsByStatus] = useState({
    "to do": [],
    doing: [],
    done: [],
    archived: [],
  });
  const [isModalOpen, setModalOpen] = useState(false); // Track goal creation modal visibility
  const [isFavorite, setIsFavorite] = useState(false); // Track whether the page is marked as favorite
  const [chatMessages, setChatMessages] = useState([]); // Chat messages for OpenAI responses
  const [lastCompletedGoal, setLastCompletedGoal] = useState(null); // Tracks the last completed goal

  // Load goals from backend on component mount
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

  // Fetch celebratory message for the last completed goal
  useEffect(() => {
    const fetchCelebratoryMessage = async () => {
      if (lastCompletedGoal) {
        try {
          const response = await fetchOpenAIResponse("", lastCompletedGoal);
          setChatMessages((prev) => [
            ...prev,
            { type: "assistant", text: response },
          ]);
        } catch (error) {
          console.error("Failed to fetch OpenAI response:", error);
        } finally {
          setLastCompletedGoal(null); // Reset tracker
        }
      }
    };

    fetchCelebratoryMessage();
  }, [lastCompletedGoal]);

  // Handle drag-and-drop between columns
  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    // If dropped outside of a droppable area, do nothing
    if (!destination) return;

    // If source and destination are the same, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    const sourceGoals = Array.from(goalsByStatus[sourceStatus]);
    const destGoals =
      sourceStatus === destStatus
        ? sourceGoals // Same column
        : Array.from(goalsByStatus[destStatus]); // Different column

    const [movedGoal] = sourceGoals.splice(source.index, 1);

    // Update the goal's status if moved to a different column
    if (sourceStatus !== destStatus) {
      movedGoal.status = destStatus;
      destGoals.splice(destination.index, 0, movedGoal);
    } else {
      // Reorder within the same column
      sourceGoals.splice(destination.index, 0, movedGoal);
    }

    // Update state with reordered goals
    const updatedState = {
      ...goalsByStatus,
      [sourceStatus]: sourceGoals.map((goal, index) => ({
        ...goal,
        order: index,
      })),
      [destStatus]: destGoals.map((goal, index) => ({
        ...goal,
        order: index,
      })),
    };

    setGoalsByStatus(updatedState);

    try {
      const updatedGoals = Object.values(updatedState).flat();
      const goalOrderPayload = updatedGoals.map((goal, index) => ({
        id: goal.id,
        order: index,
        status: goal.status,
      }));
      await UpdateGoalOrderAPI(goalOrderPayload);

      // Trigger OpenAI response if moved to "done"
      if (movedGoal.status === "done") {
        setLastCompletedGoal(movedGoal);
      }
    } catch (err) {
      console.error("Failed to update goal order in backend:", err);
    }
  };

  // Add new goal
  const addGoalHandler = (newGoal) => {
    setGoalsByStatus((prev) => ({
      ...prev,
      [newGoal.status]: [...prev[newGoal.status], newGoal],
    }));
  };

  // Update goal (e.g., Edit or Confirm Done)
  const onUpdateGoal = (updatedGoal) => {
    setGoalsByStatus((prev) => {
      const newGoalsByStatus = { ...prev };

      // Find the original position of the goal in its current status
      const currentGoals = newGoalsByStatus[updatedGoal.status];
      const existingIndex = currentGoals.findIndex(
        (goal) => goal.id === updatedGoal.id
      );

      if (existingIndex > -1) {
        const currentGoal = currentGoals[existingIndex];

        // Update goal fields explicitly, allowing empty strings
        currentGoals[existingIndex] = {
          ...currentGoal,
          title: updatedGoal.title ?? currentGoal.title, // Keep current title if not provided
          description:
            updatedGoal.description !== undefined
              ? updatedGoal.description // Allow empty description
              : currentGoal.description,
          status: updatedGoal.status ?? currentGoal.status,
        };
      }

      // If status has changed, move the goal
      if (updatedGoal.status !== currentGoals[existingIndex]?.status) {
        newGoalsByStatus[updatedGoal.status] = [
          ...newGoalsByStatus[updatedGoal.status],
          {
            ...updatedGoal,
            order: newGoalsByStatus[updatedGoal.status].length,
          },
        ];
        newGoalsByStatus[currentGoals[existingIndex]?.status].splice(
          existingIndex,
          1
        );
      }

      if (updatedGoal.status === "done") {
        setLastCompletedGoal(updatedGoal); // Trigger OpenAI response
      }

      return newGoalsByStatus;
    });
  };

  // Delete goal
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
      {/* Header Section */}
      <div className="daily-habits-header">
        <div className="daily-habits-header-bg"></div>
        <div className="daily-habits-title-container">
          <div className="icon-container">
            <BiHome className="icon clipboard-icon" />
          </div>
          <h1 className="daily-habits-title">Long Term Goals</h1>
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

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addGoalHandler={addGoalHandler}
      />

      {/* Drag-and-Drop Columns */}
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

      {/* Chatboard */}
      <ChatBoard externalMessages={chatMessages} />
    </div>
  );
};

export default LongTermGoalsPage;
