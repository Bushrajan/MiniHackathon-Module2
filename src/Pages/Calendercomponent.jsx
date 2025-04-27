import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CalendarComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);

  return (
    <div className="container border p-4 mx-auto rounded shadow-lg mt-4">
      <h2 className="text-center mb-4">{month} {year}</h2>

      {/* Days of the Week */}
      <div className="row my-3  text-center fw-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="col border p-2">{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="row">
        {daysArray.map((day) => (
          <div key={day} className="col border  my-3  rounded p-2 text-center">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
