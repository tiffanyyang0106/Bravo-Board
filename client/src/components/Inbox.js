/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * InboxPage Component:
 * Displays a list of mock goals in the inbox. Serves as a placeholder for future functionality.
 */

import React from "react";

const InboxPage = () => {
  // Mock data: List of goals for the inbox
  const goals = [
    "Learn React basics",
    "Complete project setup",
    "Write unit tests",
    "Refactor old code",
    "Organize files",
  ];

  return (
    <div
      className="inbox p-4"
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        color: "#1a2b48",
      }}
    >
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: "#1a2b48" }}>Inbox</h1>
        <button className="btn btn-primary">Create Goal</button>
      </div>

      {/* Goals List */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "600px",
          marginTop: "20px", // Centered with some spacing
        }}
      >
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-3 shadow-sm"
              style={{
                backgroundColor: "#ffffff",
                color: "#1a2b48",
              }}
            >
              {goal}
            </div>
          ))
        ) : (
          <p className="text-center" style={{ color: "#888" }}>
            No goals yet. Start by creating one!
          </p>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
