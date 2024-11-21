// api/FetchGoalsAPI.js

const fetchGoals = async () => {
  try {
    const response = await fetch("/api/goals/goals");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Error fetching goals:", err);
    return [];
  }
};

export default fetchGoals;
