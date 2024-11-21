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
        paddingTop: "100px", // Positioning the search bar closer to the top
      }}
    >
      <div
        className="input-group shadow-sm rounded position-relative"
        style={{
          width: "100%",
          maxWidth: "800px", // Wider search bar
          border: "1px solid #ddd",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for goals or tasks"
          style={{
            border: "none",
            boxShadow: "none",
            color: "black", // User-entered text
            fontSize: "18px",
            paddingLeft: "15px",
            paddingRight: "50px", // Space for the icon button
          }}
        />
        {/* Search Icon Button */}
        <button
          className="btn"
          style={{
            position: "absolute",
            right: "10px", // Adjusted for padding consistency
            top: "50%",
            transform: "translateY(-50%)", // Vertically center the button
            width: "40px",
            height: "40px",
            border: "none",
            backgroundColor: "transparent", // Transparent to blend with the input
            cursor: "pointer",
          }}
        >
          <i
            className="bi bi-search"
            style={{
              fontSize: "20px",
              color: "#bbb", // Light gray for the icon
            }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
