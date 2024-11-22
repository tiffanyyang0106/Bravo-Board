/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * SearchPage Component:
 * Displays a search bar for finding goals or tasks.
 * Currently a placeholder with no backend integration.
 */

import React from "react";

const SearchPage = () => {
  return (
    <div
      className="search"
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px", // Space above the search bar
      }}
    >
      {/* Search Input Group */}
      <div
        className="input-group shadow-sm rounded position-relative"
        style={{
          width: "100%",
          maxWidth: "800px", // Wider search bar
          border: "1px solid #ddd",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for goals or tasks"
          style={{
            border: "none",
            boxShadow: "none",
            color: "black",
            fontSize: "18px",
            paddingLeft: "15px",
            paddingRight: "50px", // Space for the icon button
          }}
        />
        <button
          className="btn"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <i
            className="bi bi-search"
            style={{
              fontSize: "20px",
              color: "#bbb", // Subtle gray for icon
            }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
