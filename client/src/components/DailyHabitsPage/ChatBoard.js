import React, { useState, useEffect, useRef } from "react";
import fetchOpenAIResponse from "../../api/OpenAIAPI";
import "../../styles/ChatBoard.css";

const ChatBoard = ({ externalMessages = [] }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const processedMessagesRef = useRef(new Set()); // Track added external messages

  useEffect(() => {
    // Add new external messages only if they haven't already been processed
    const newMessages = externalMessages.filter(
      (msg) => !processedMessagesRef.current.has(msg.text)
    );

    if (newMessages.length > 0) {
      setChatMessages((prev) => [...prev, ...newMessages]);
      newMessages.forEach((msg) => processedMessagesRef.current.add(msg.text));
    }
  }, [externalMessages]); // Watch for changes to externalMessages

  const handleSend = async () => {
    if (userMessage.trim() !== "") {
      // Add user's message to chat history
      const userChat = { type: "user", text: userMessage };
      setChatMessages((prev) => [...prev, userChat]);

      // Clear input field
      setUserMessage("");

      // Call OpenAI API for a response
      const assistantResponse = await fetchOpenAIResponse(userMessage);
      const assistantChat = { type: "assistant", text: assistantResponse };

      // Add assistant's response to chat history
      setChatMessages((prev) => [...prev, assistantChat]);
    }
  };

  return (
    <div className="chat-board">
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === "user" ? "right" : "left"}`}
          >
            {msg.type === "assistant" && (
              <div className="chat-avatar">
                <div className="avatar-icon" />
              </div>
            )}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Message Bravo"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send on Enter
        />
        <button className="send-button" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
