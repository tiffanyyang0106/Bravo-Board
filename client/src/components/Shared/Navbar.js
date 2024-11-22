/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * NavBar Component:
 * Sidebar navigation with links to various sections of the app.
 * Includes profile information, main navigation, boards, and a premium upgrade link.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Daily Habits"); // Track active navigation link

  // Handle navigation link click
  const handleClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className="navbar-container-whole">
      {/* Header Section */}
      <div className="navbar-header">
        <h3 className="bravo-board-title">BRAVO BOARD</h3>
        <p className="navbar-subtitle">
          Your goals, your progress, your applause.
        </p>
      </div>

      {/* Divider */}
      <div className="navbar-divider"></div>

      {/* User Info Section */}
      <div className="d-flex align-items-center px-3 my-3 user-info">
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
      <div className="navbar-divider"></div>

      {/* Main Navigation Links */}
      <ul className="nav nav-pills flex-column px-3 main-nav">
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
                  activeLink === item.name ? "#2a5d91" : "transparent",
              }}
              onClick={() => handleClick(item.name)}
            >
              <i className={`bi ${item.icon} me-2`}></i> {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Spacer Between Sections */}
      <div style={{ height: "40px" }}></div>

      {/* Your Boards Section */}
      <div className="px-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p
            className="text small mb-0"
            style={{
              color: "#b3b3b3",
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
              color: "#e6e6e6",
            }}
          ></i>
        </div>
        <ul className="nav nav-pills flex-column">
          {[
            {
              name: "Daily Habits",
              icon: "bi-clipboard",
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
                    activeLink === item.name ? "#2a5d91" : "transparent",
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
      <div className="navbar-divider"></div>

      {/* Upgrade to Premium Link */}
      <div className="px-3 mt-auto premium-upgrade">
        <Link
          to="/premium"
          className="text-decoration-none d-flex align-items-center"
          style={{
            color: activeLink === "Upgrade to Premium" ? "white" : "#e6e6e6",
            backgroundColor:
              activeLink === "Upgrade to Premium" ? "#2a5d91" : "transparent",
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
