/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle fetching all goals.
 */

/**
 * Fetches all goals from the backend.
 *
 * @returns {Array} - List of goals, or an empty array if no data is returned.
 * @throws Will throw an error if the request fails.
 */
const fetchGoals = async () => {
  try {
    const response = await fetch("/api/goals/goals");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure the data is an array before returning
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching goals:", err);
    return []; // Return empty array in case of failure
  }
};

export default fetchGoals;
