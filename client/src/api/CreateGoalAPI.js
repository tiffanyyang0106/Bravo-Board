// api/createGoalAPI.js

/**
 * Sends a POST request to create a new goal.
 *
 * @param {Object} data - The data for the new goal (title, description, etc.).
 * @returns {Object} - The created goal from the server.
 */
const CreateGoalAPI = async (data) => {
  try {
    const response = await fetch("/api/goals/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.goalTitle,
        description: data.goalDescription,
        status: "to do", // Default status
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the created goal
  } catch (err) {
    console.error("Error creating goal:", err);
    throw err; // Re-throw the error to handle it in the caller
  }
};

export default CreateGoalAPI;
