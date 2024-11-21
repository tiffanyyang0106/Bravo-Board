const UpdateGoalAPI = async (goalId, updatedData) => {
  console.log("Initiating updateGoal...");
  console.log("Goal ID:", goalId); // Log the goal ID
  console.log("Payload being sent:", updatedData); // Log the payload

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  console.log("Token retrieved from localStorage:", token);

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  };

  try {
    console.log("Sending PUT request to:", `/api/goals/goal/${goalId}`);
    console.log("Request options:", requestOptions);

    const response = await fetch(`/api/goals/goal/${goalId}`, requestOptions);
    console.log("Response received:", response);

    if (!response.ok) {
      console.error("Failed to update goal. HTTP Status:", response.status);
      throw new Error(`Failed to update goal: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Update successful. Server response:", result);
    return result;
  } catch (err) {
    console.error("Error updating goal:", err);
    throw err;
  }
};

export default UpdateGoalAPI;
