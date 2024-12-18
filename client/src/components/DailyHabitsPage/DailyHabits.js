/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * DailyHabitsPage Component:
 * A central page for managing daily goals organized into columns (To Do, Doing, Done, and Archived).
 * Features drag-and-drop functionality, goal creation, editing, and deletion.
 * Integrates with OpenAI for celebratory messages upon goal completion.
 */

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
import fetchOpenAIResponse from "../../api/OpenAIAPI";
import ChatBoard from "./ChatBoard";
import "../../styles/DailyHabits.css";

const DailyHabitsPage = () => {
  // State for managing goals by status
  const [goalsByStatus, setGoalsByStatus] = useState({
    "to do": [],
    doing: [],
    done: [],
    archived: [],
  });

  const [isModalOpen, setModalOpen] = useState(false); // Goal creation modal visibility
  const [isFavorite, setIsFavorite] = useState(false); // Toggle for favoriting this page
  const [chatMessages, setChatMessages] = useState([]); // OpenAI celebratory messages
  const [lastCompletedGoal, setLastCompletedGoal] = useState(null); // Tracks the most recent completed goal

  // Load goals from the backend when the component mounts
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

  // Fetch celebratory message for completed goals
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

  // Handle drag-and-drop actions
  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return; // Do nothing if dropped outside or in the same position
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    let movedGoal;

    setGoalsByStatus((prev) => {
      const updatedGoals = { ...prev };

      // Get source and destination goals
      const sourceGoals = Array.from(updatedGoals[sourceStatus]);
      const destGoals =
        sourceStatus === destStatus
          ? sourceGoals
          : Array.from(updatedGoals[destStatus]);

      // Move the goal
      const [movedGoal] = sourceGoals.splice(source.index, 1);
      movedGoal.status = destStatus;
      destGoals.splice(destination.index, 0, movedGoal);

      // Update the order in both source and destination
      updatedGoals[sourceStatus] = sourceGoals.map((goal, index) => ({
        ...goal,
        order: index,
      }));
      updatedGoals[destStatus] = destGoals.map((goal, index) => ({
        ...goal,
        order: index,
      }));

      return updatedGoals;
    });

    try {
      const updatedGoals = Object.values(goalsByStatus).flat();
      const goalOrderPayload = updatedGoals.map((goal, index) => ({
        id: goal.id,
        order: index,
        status: goal.status,
      }));

      await UpdateGoalOrderAPI(goalOrderPayload);

      if (destStatus === "done") {
        setLastCompletedGoal(movedGoal);
      }
    } catch (error) {
      console.error("Failed to update goal order in backend:", error);
    }
  };

  // Add a new goal to the appropriate column
  const addGoalHandler = (newGoal) => {
    setGoalsByStatus((prev) => ({
      ...prev,
      [newGoal.status]: [...prev[newGoal.status], newGoal],
    }));
  };

  // Update a goal (e.g., Edit or Confirm Done)
  const onUpdateGoal = (updatedGoal) => {
    setGoalsByStatus((prev) => {
      const updatedGoals = { ...prev };

      // Remove the goal from its current column
      for (const [status, goals] of Object.entries(updatedGoals)) {
        const index = goals.findIndex((goal) => goal.id === updatedGoal.id);
        if (index > -1) {
          goals.splice(index, 1);
          break;
        }
      }

      // Add the goal to the new status column
      updatedGoals[updatedGoal.status] = [
        ...updatedGoals[updatedGoal.status],
        updatedGoal,
      ];

      if (updatedGoal.status === "done") {
        setLastCompletedGoal(updatedGoal); // Trigger OpenAI response
      }

      return updatedGoals;
    });
  };

  // Delete a goal
  const onDeleteGoal = (goalId) => {
    setGoalsByStatus((prev) => {
      const updatedGoals = {};
      for (const [status, goals] of Object.entries(prev)) {
        updatedGoals[status] = goals.filter((goal) => goal.id !== goalId);
      }
      return updatedGoals;
    });
  };

  return (
    <div className="daily-habits">
      {/* Header Section */}
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

export default DailyHabitsPage;
