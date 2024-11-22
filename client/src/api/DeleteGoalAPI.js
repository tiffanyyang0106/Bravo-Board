/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle deleting goals.
 */

/**
 * Deletes a goal by its ID.
 *
 * @param {number} goalId - The unique ID of the goal to delete.
 * @returns {boolean} - Returns true if deletion is successful.
 * @throws Will throw an error if the request fails.
 */
const deleteGoal = async (goalId) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`/api/goals/goal/${goalId}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to delete goal: ${response.statusText}`);
    }

    return true;
  } catch (err) {
    console.error("Error deleting goal:", err);
    throw err;
  }
};

export default deleteGoal;
