import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Daily Habits"); // Track active link

  const handleClick = (linkName) => {
    setActiveLink(linkName); // Update the active link on click
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "280px",
        height: "100vh",
        backgroundColor: "#1a2b48", // Customized lighter dark blue
        color: "#e6e6e6", // Off-white for general text
        position: "fixed",
        left: "0",
      }}
    >
      {/* Logo and Centered Title */}
      <div className="text-center py-3">
        <h3 className="fw-bold mb-1" style={{ color: "white" }}>
          BRAVO BOARD
        </h3>
        <p
          className="text small mb-0"
          style={{
            color: "#b3b3b3",
            fontSize: "12px", // Smaller subtitle font size
            marginTop: "4px",
          }}
        >
          Your goals, your progress, your applause.
        </p>
      </div>

      {/* Subtle Divider */}
      <div
        style={{
          borderBottom: "1px solid #2e3b55",
          margin: "0 16px",
        }}
      ></div>

      {/* User Info Section */}
      <div
        className="d-flex align-items-center px-3 my-3"
        style={{ marginLeft: "12px" }} // Move Tiffany line to the right
      >
        <img
          src="/images/tiffany_profile.png"
          alt="User"
          className="rounded-circle me-2"
          width="24"
          height="24"
        />
        <strong style={{ color: "white" }}>Tiffany</strong>
      </div>

      {/* Divider */}
      <div
        style={{
          borderBottom: "1px solid #2e3b55",
          margin: "0 16px",
        }}
      ></div>

      {/* Main Navigation */}
      <ul
        className="nav nav-pills flex-column px-3"
        style={{ marginTop: "16px" }} // Add space above the navigation
      >
        {[
          { name: "Search", icon: "bi-search", path: "/search" },
          { name: "Inbox", icon: "bi-inbox", path: "/inbox" },
          { name: "Calendar", icon: "bi-calendar", path: "/calendar" },
        ].map((item) => (
          <li className="nav-item" key={item.name}>
            <Link
              to={item.path}
              className="nav-link"
              style={{
                color: activeLink === item.name ? "white" : "#e6e6e6",
                backgroundColor:
                  activeLink === item.name ? "#2a5d91" : "transparent", // Slightly brighter blue
              }}
              onClick={() => handleClick(item.name)}
            >
              <i className={`bi ${item.icon} me-2`}></i> {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Increased Space Between Calendar and "Your Boards" */}
      <div style={{ height: "40px" }}></div>

      {/* Your Boards Section */}
      <div className="px-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p
            className="text small mb-0"
            style={{
              color: "#b3b3b3", // Gray text for "Your Boards"
              fontSize: "12px",
            }}
          >
            Your boards
          </p>
          <i
            className="bi bi-plus"
            style={{
              cursor: "pointer",
              fontSize: "16px",
              color: "#e6e6e6", // Off-white for the plus icon
            }}
          ></i>
        </div>
        <ul className="nav nav-pills flex-column">
          {[
            {
              name: "Daily Habits",
              icon: "bi-clipboard-check",
              path: "/daily-habits",
            },
            {
              name: "Long Term Goals",
              icon: "bi-house",
              path: "/long-term-goals",
            },
          ].map((item) => (
            <li className="nav-item" key={item.name}>
              <Link
                to={item.path}
                className="nav-link"
                style={{
                  color: activeLink === item.name ? "white" : "#e6e6e6",
                  backgroundColor:
                    activeLink === item.name ? "#2a5d91" : "transparent", // Slightly brighter blue
                }}
                onClick={() => handleClick(item.name)}
              >
                <i className={`bi ${item.icon} me-2`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div
        style={{
          borderBottom: "1px solid #2e3b55",
          margin: "0 16px",
        }}
      ></div>

      {/* Upgrade to Premium Section */}
      <div
        className="px-3 mt-auto"
        style={{ marginLeft: "16px", marginBottom: "10px" }}
      >
        <Link
          to="/premium"
          className="text-decoration-none d-flex align-items-center"
          style={{
            color: activeLink === "Upgrade to Premium" ? "white" : "#e6e6e6",
            backgroundColor:
              activeLink === "Upgrade to Premium" ? "#2a5d91" : "transparent", // Slightly brighter blue
            fontSize: "16px",
          }}
          onClick={() => handleClick("Upgrade to Premium")}
        >
          <i className="bi bi-gift me-2"></i> Upgrade to Premium
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
