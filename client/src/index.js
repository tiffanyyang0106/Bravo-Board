import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot for React 18
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/Navbar";
import CalendarPage from "./components/Calendar";
import CreateGoalModal from "./components/CreateGoal";
import InboxPage from "./components/Inbox";
import SearchPage from "./components/Search";
import DailyHabitsPage from "./components/DailyHabits";
import LongTermGoalsPage from "./components/LongTermGoals";

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

// import React, { useEffect, useState } from "react";
// import { createRoot } from "react-dom/client"; // Use createRoot for React 18
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import NavBar from "./components/Navbar";
// import CalendarPage from "./components/Calendar";
// import CreateGoalPage from "./components/CreateGoal";
// import InboxPage from "./components/Inbox";
// import SearchPage from "./components/Search";
// import DailyHabitsPage from "./components/DailyHabits";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const App = () => {
//   return (
//     <Router>
//       <div className="container">
//         <NavBar />
//         <Routes>
//           <Route path="/create_goal">
//             <CreateGoalPage />
//           </Route>
//           <Route path="/inbox">
//             <InboxPage />
//           </Route>
//           <Route path="/calendar">
//             <CalendarPage />
//           </Route>
//           <Route path="/search">
//             <SearchPage />
//           </Route>
//           <Route path="/">
//             <DailyHabitsPage />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
//   //   const [message, setMessage] = useState("");

//   //   useEffect(() => {
//   //     const url = "/api/goals/hello";
//   //     console.log("Fetching:", url);

//   //     fetch(url)
//   //       .then((response) => {
//   //         console.log("Response status:", response.status);
//   //         if (!response.ok) {
//   //           throw new Error(`HTTP error! status: ${response.status}`);
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         console.log("Data received:", data);
//   //         setMessage(data.message);
//   //       })
//   //       .catch((err) => {
//   //         console.error("Fetch error:", err.message); // Log the specific error
//   //         console.error(err); // Log the full error object for debugging
//   //       });
//   //   }, []);

//   //   return (
//   //     <div className="container">
//   //       <h1>{message}</h1> {/* Display the message */}
//   //     </div>
//   //   );
// };

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement); // Use createRoot
// root.render(<App />);

// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom'; // Correct import for ReactDOM

// const App = () => {

//     useEffect(
//         ()=>{
//             fetch('/goals/hello')
//             .then(response=>response.json())
//             .then(data=>{console.log(data)
//                 .setMessage(data.message)
//             })
//             .catch(err=>console.log(err))
//         },[]
//     )

//     const [message, setMessage] = useState('');
//     return (
//         <div className="container">
//             <h1>{message}</h1>
//         </div>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));
