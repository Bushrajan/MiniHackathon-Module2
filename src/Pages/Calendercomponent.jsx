// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CalendarComponent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  const daysArray = [...Array(daysInMonth).keys()].map((day) => day + 1);

  return (
    <div className="container  border p-4 mx-auto rounded shadow-lg mt-4">
      <h2 className="text-center mb-4">
        {month} {year}
      </h2>

      {/* Days of the Week */}
      <div className="row text-center  fw-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="col border p-2">
            {day}
          </div>
        ))}
      </div>

      {/* First Two Rows (15 days each) */}
      <div className="row ">
        {daysArray.slice(0, 31).map((day) => (
          <div
            key={day}
            className="col-1     mx-auto my-2 p-2 text-center"
          >
            <button className="btn  border-light text-white w-100">
              {day}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
