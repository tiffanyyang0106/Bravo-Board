/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle updating a goal.
 */

/**
 * Sends a PUT request to update a specific goal.
 *
 * @param {number} goalId - The ID of the goal to update.
 * @param {Object} updatedData - Contains the updated goal fields (e.g., title, description).
 * @returns {Object} - The updated goal data from the backend.
 * @throws Will throw an error if the request fails.
 */
const UpdateGoalAPI = async (goalId, updatedData) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  };

  try {
    const response = await fetch(`/api/goals/goal/${goalId}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update goal: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error updating goal:", err);
    throw err;
  }
};

export default UpdateGoalAPI;
