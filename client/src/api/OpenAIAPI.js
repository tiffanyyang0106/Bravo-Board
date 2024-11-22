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
              "You are a very supportive cheerleader for the user's personal goals.",
          },
          {
            role: "user",
            content: customMessage,
          },
        ],
        max_tokens: 50, // Limit response length
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
