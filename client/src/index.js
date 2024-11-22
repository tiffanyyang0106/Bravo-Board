/**
 * Author: Tiffany Yang
 * Date: November 21, 2024
 *
 * Application Entry Point:
 * This module initializes the React application, sets up routing with `react-router-dom`,
 * and defines the main layout, including the NavBar (sidebar) and the page content area.
 *
 * Key Features:
 * - Integrates Bootstrap for styles and icons.
 * - Defines routes for the application: Inbox, Calendar, Search, Daily Habits, and Long-Term Goals.
 * - Redirects the root path (`/`) to the Daily Habits page.
 * - Uses `React 18`'s `createRoot` for rendering.
 *
 * Components:
 * - `NavBar`: Sidebar navigation.
 * - `DailyHabitsPage` & `LongTermGoalsPage`: Core pages for managing goals.
 * - `CalendarPage`, `InboxPage`, `SearchPage`: Additional app functionalities.
 *
 * Dependencies:
 * - `react-router-dom` for routing.
 * - Bootstrap for UI styling.
 */

import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot for React 18
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/main.css"; // Import your custom styles

import NavBar from "./components/Shared/Navbar";
import CalendarPage from "./components/Calendar";
import InboxPage from "./components/Inbox";
import SearchPage from "./components/Search";
import DailyHabitsPage from "./components/DailyHabitsPage/DailyHabits";
import LongTermGoalsPage from "./components/DailyHabitsPage/LongTermGoals";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      {/* Main layout */}
      <div className="d-flex">
        <NavBar /> {/* Sidebar */}
        <div style={{ marginLeft: "280px", padding: "20px", width: "100%" }}>
          <Routes>
            {/* Define routes with the 'element' prop */}
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/daily-habits" element={<DailyHabitsPage />} />
            <Route path="/long-term-goals" element={<LongTermGoalsPage />} />
            {/* Redirect root ("/") to /daily-habits */}
            <Route path="/" element={<Navigate to="/daily-habits" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot
root.render(<App />);
