/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * API to handle fetching OpenAI GPT responses.
 */

/**
 * Fetches a response from the OpenAI GPT API.
 *
 * @param {string} userInput - User input text to process.
 * @param {Object} [completedGoal] - Optional. If provided, prompts GPT to celebrate the goal.
 * @returns {string} - GPT-generated response text.
 * @throws Will throw an error if the request fails.
 */
const fetchOpenAIResponse = async (userInput, completedGoal = null) => {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const customMessage = completedGoal
    ? `The user just completed their goal: "${completedGoal.title}". Please celebrate them.`
    : userInput;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly and supportive cheerleader who encourages and celebrates user achievements.",
          },
          { role: "user", content: customMessage },
        ],
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Sorry, I couldn't process that right now. Try again later.";
  }
};

export default fetchOpenAIResponse;
