import { useState, useEffect } from "react";

import {
  onAuthStateChanged,
  auth,
  collection,
  addDoc,
  db,
  serverTimestamp,
} from "../firebase/firebase.config.js";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const goto = useNavigate();
  const [logedIn, setLogIn] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showAddTaskButton, setShowAddTaskButton] = useState(true);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogIn(true);
      } else {
        setLogIn(false);
      }
    });
    return () => checkUser();
  }, []);

  const handleTaskform = () => {
    if (!logedIn) {
      setError("You cannot add a task without logging in.");
      setMessage("Login first to add a task.");
      setTimeout(() => {
        goto("/authForm");
      }, 3000);
    } else {
      setFormVisible(true);
      setShowAddTaskButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = e.target[0].value;
    const description = e.target[1].value;
    const time = e.target[2].value;
    const date = e.target[3].value;
    const day = e.target[4].value;

    try {
      await addDoc(collection(db, "userTask"), {
        id: auth.currentUser.uid,
        task,
        description,
        time,
        date,
        day,
        timestamp: serverTimestamp(),
      });

      setTimeout(() => {
        goto("/alltasks");
      }, 3000);
    } catch (error) {
      setError("Error adding task: " + error.message);
      setMessage("");
    }
  };

  return (
    <div className="p-0 sm:p-0 w-full h-screen flex flex-col justify-center items-center font-[ZCOOL] text-center">
      {showAddTaskButton && (
        <button
          onClick={handleTaskform}
          className="p-2 rounded my-3 w-[150px] bg-white text-black hover:bg-[#08110E] hover:border-white border hover:text-white mx-auto transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          Add Task
        </button>
      )}
      <h1 className="mt-3">Task Form </h1>
      {error && <p className="text-red-500 text-1xl my-3">{error}</p>}
      {message && <p className="text-green-500 text-1xl my-3">{message}</p>}
      {formVisible && logedIn && (
        <div className="w-[100%] lg:w-[60%] m-10 lg:m-0  flex items-center justify-center min-h-100 mx-auto  my-5 rounded p-2 gap-2">
          <form
            className="grid form1 w-[100%] lg:w-[60%] overflow-hidden text-start h-full lg:min-h-100 p-2 bg-black text-white rounded"
            onSubmit={handleSubmit}
          >
            <label className="flex justify-between items-center gap-3 mb-3">
              <span className="w-full lg:w-[50%] mb-1 text-left font-medium text-xl">
                Task
              </span>
              <input
                className="form-input form-control   form-control w-full p-2 border rounded border-gray-300 text-white placeholder:text-gray-300 outline-none text-xs"
                type="text"
                placeholder="add task here ..."
                required
              />
            </label>
            <label className="w-full grid gap-3 mb-3">
              <p className="w-[100%] mb-1 font-medium text-left text-white text-xl">
                Task Description
              </p>
              <textarea
                className="w-full form-input form-control   p-2 border rounded border-gray-300 bg-white text-black placeholder:text-gray-600 outline-none text-xs"
                type="text"
                placeholder="add description here ..."
                required
              ></textarea>
            </label>
            <label className="flex justify-between items-center gap-3 mb-3">
              <span className="w-full lg:w-[50%] mb-1 text-left font-medium text-xl">
                Time
              </span>
              <input
                className="form-input form-control   w-full p-2 border rounded border-gray-300 text-white placeholder:text-gray-300 outline-none text-xs"
                type="time"
                placeholder="add time"
                required
              />
            </label>
            <label className="flex justify-between items-center gap-3 mb-3">
              <span className="w-full lg:w-[50%] mb-1 text-left font-medium text-xl">
                Date
              </span>
              <input
                className="form-input form-control   w-full p-2 border rounded border-gray-300 text-white placeholder:text-gray-300 outline-none text-xs"
                type="date"
                placeholder="add date"
                required
              />
            </label>
            <label className="flex justify-between items-center gap-3 mb-3">
              <span className="w-full lg:w-[50%] mb-1 text-left font-medium text-xl">
                Day
              </span>
              <select
                className="form-select w-full p-2 border rounded border-gray-300 text-white placeholder:text-gray-300 outline-none text-xs"
                required
                placeholder="Select day"
              >
                <option className="bg-black" value="">
                  Select Day
                </option>
                <option className="bg-black" value="Monday">
                  Monday
                </option>
                <option className="bg-black" value="Tuesday">
                  Tuesday
                </option>
                <option className="bg-black" value="Wednesday">
                  Wednesday
                </option>
                <option className="bg-black" value="Thursday">
                  Thursday
                </option>
                <option className="bg-black" value="Friday">
                  Friday
                </option>
                <option className="bg-black" value="Saturday">
                  Saturday
                </option>
                <option className="bg-black" value="Sunday">
                  Sunday
                </option>
              </select>
            </label>
            <input
              type="submit"
              className="w-full button1 transition delay-150 duration-250 ease-in-out hover:scale-90  p-2 pt-3 rounded"
              value="Done Adding"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTask;
