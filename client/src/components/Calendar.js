import React from "react";

const CalendarPage = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // Mock 30 days

  // Group dates into rows of 7
  const groupedDates = [];
  for (let i = 0; i < dates.length; i += 7) {
    groupedDates.push(dates.slice(i, i + 7));
  }

  return (
    <div
      className="calendar p-4"
      style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: "#1a2b48" }}>Your Calendar</h1>
        <button className="btn btn-primary">Add Event</button>
      </div>

      {/* Days of the Week */}
      <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center fw-bold"
            style={{ width: "14.28%", color: "#1a2b48" }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      {groupedDates.map((week, weekIndex) => (
        <div className="d-flex justify-content-between mb-3" key={weekIndex}>
          {week.map((date) => (
            <div
              key={date}
              className="border rounded"
              style={{
                width: "14.28%",
                height: "100px",
                backgroundColor: date === 15 ? "#e8f4fd" : "#ffffff", // Highlight current day (mock: 15th)
                borderColor: "#ddd",
                position: "relative", // For positioning the date
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  fontSize: "12px",
                  color: "#1a2b48",
                }}
              >
                {date}
              </div>
              {date === 15 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "5px",
                    fontSize: "10px",
                    color: "#007bff",
                  }}
                >
                  Event
                </div>
              )}
            </div>
          ))}
          {/* Fill empty spots in the last row if needed */}
          {week.length < 7 &&
            Array.from({ length: 7 - week.length }).map((_, fillerIndex) => (
              <div
                key={`filler-${fillerIndex}`}
                className="border rounded"
                style={{
                  width: "14.28%",
                  height: "100px",
                  backgroundColor: "#f9f9f9", // Matches the page background
                  borderColor: "#ddd",
                }}
              ></div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarPage;
