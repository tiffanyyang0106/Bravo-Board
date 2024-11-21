// api/DeleteGoalAPI.js

const deleteGoal = async (goalId) => {
  console.log("Initiating delete for goal ID:", goalId);

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  };

  try {
    const response = await fetch(`/api/goals/goal/${goalId}`, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to delete goal: ${response.statusText}`);
    }
    console.log("Goal deleted successfully.");
    return true;
  } catch (err) {
    console.error("Error deleting goal:", err);
    throw err;
  }
};

export default deleteGoal;
