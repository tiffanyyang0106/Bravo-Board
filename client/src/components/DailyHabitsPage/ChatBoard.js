/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * ChatBoard Component:
 * Provides a chat interface for user interactions and assistant responses.
 * External messages can be passed in and are dynamically added to the chat.
 * Features include real-time user input, OpenAI API integration, and message duplication prevention.
 */

import React, { useState, useEffect, useRef } from "react";
import fetchOpenAIResponse from "../../api/OpenAIAPI";
import "../../styles/ChatBoard.css";

const ChatBoard = ({ externalMessages = [] }) => {
  const [userMessage, setUserMessage] = useState(""); // Tracks user input in the text box
  const [chatMessages, setChatMessages] = useState([]); // Maintains the chat history
  const processedMessagesRef = useRef(new Set()); // Tracks processed external messages to prevent duplicates

  // Effect: Handle incoming external messages and avoid re-adding already processed ones
  useEffect(() => {
    const newMessages = externalMessages.filter(
      (msg) => !processedMessagesRef.current.has(msg.text) // Check for unprocessed messages
    );

    if (newMessages.length > 0) {
      setChatMessages((prev) => [...prev, ...newMessages]); // Append new messages to chat
      newMessages.forEach((msg) => processedMessagesRef.current.add(msg.text)); // Mark them as processed
    }
  }, [externalMessages]); // Run whenever externalMessages changes

  // Handles sending a user message and receiving a response from the OpenAI API
  const handleSend = async () => {
    if (userMessage.trim() !== "") {
      // Add the user's message to the chat history
      const userChat = { type: "user", text: userMessage };
      setChatMessages((prev) => [...prev, userChat]);

      // Clear the input field after sending
      setUserMessage("");

      try {
        // Fetch assistant's response from the OpenAI API
        const assistantResponse = await fetchOpenAIResponse(userMessage);
        const assistantChat = { type: "assistant", text: assistantResponse };

        // Add assistant's response to the chat history
        setChatMessages((prev) => [...prev, assistantChat]);
      } catch (error) {
        console.error("Error fetching assistant response:", error);
        setChatMessages((prev) => [
          ...prev,
          {
            type: "assistant",
            text: "Sorry, I couldn't process that right now.",
          },
        ]);
      }
    }
  };

  return (
    <div className="chat-board">
      {/* Chat Messages Display */}
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === "user" ? "right" : "left"}`}
          >
            {/* Display avatar for assistant messages */}
            {msg.type === "assistant" && (
              <div className="chat-avatar">
                <div className="avatar-icon" />
              </div>
            )}
            {/* Display the message text */}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* User Input and Send Button */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Message Bravo"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)} // Update state on user input
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send message on Enter key
        />
        <button className="send-button" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
