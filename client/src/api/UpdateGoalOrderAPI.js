/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle updating the order of goals.
 */

/**
 * Sends a PUT request to update the order of goals.
 *
 * @param {Array} goalOrder - List of goals with their updated order and statuses.
 * @returns {Object} - Response data from the backend.
 * @throws Will throw an error if the request fails.
 */
const UpdateGoalOrderAPI = async (goalOrder) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: goalOrder }),
  };

  try {
    const response = await fetch("/api/goals/order", requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to update goal order: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in UpdateGoalOrderAPI:", error);
    throw error;
  }
};

export default UpdateGoalOrderAPI;
