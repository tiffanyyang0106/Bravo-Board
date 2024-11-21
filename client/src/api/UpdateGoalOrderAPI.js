// api/UpdateGoalOrderAPI.js

const UpdateGoalOrderAPI = async (goalOrder) => {
  console.log("UpdateGoalOrderAPI called...");
  console.log("Goal order payload:", goalOrder);

  // Retrieve the token from localStorage
  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  console.log("Retrieved token:", token);

  // Prepare the request options
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: goalOrder }),
  };

  console.log("Request options:", requestOptions);
  console.log("API URL:", "/api/goals/order");

  try {
    // Send the fetch request
    const response = await fetch("/api/goals/order", requestOptions);

    console.log("Response status:", response.status);
    console.log("Response OK?", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`Failed to update goal order: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error in UpdateGoalOrderAPI:", error);
    throw error;
  }
};

export default UpdateGoalOrderAPI;
