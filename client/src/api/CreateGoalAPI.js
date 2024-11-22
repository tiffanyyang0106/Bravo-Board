/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle creating new goals.
 */

/**
 * Sends a POST request to create a new goal.
 *
 * @param {Object} data - Contains the goal title and description.
 * @returns {Object} - The created goal data from the backend.
 * @throws Will throw an error if the request fails.
 */
const CreateGoalAPI = async (data) => {
  try {
    const response = await fetch("/api/goals/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.goalTitle,
        description: data.goalDescription,
        status: "to do", // Default status for new goals
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating goal:", err);
    throw err; // Pass error to the caller
  }
};

export default CreateGoalAPI;
