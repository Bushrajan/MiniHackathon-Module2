import { useEffect, useState } from "react";
import { onSnapshot, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase.config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TasksAdded = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Setup Firestore listener for the "userTask" collection
    const unsubscribe = onSnapshot(collection(db, "userTask"), (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskData);
    });

    return () => unsubscribe();
  }, []);

  //   Handle Task Deletion
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "userTask", id));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //   Handle Task Editing (Update)
  const handleEditTask = async (id) => {
    const newTask = prompt("Enter new task title:");
    const newDescription = prompt("Enter new task description:");
    
    if (newTask && newDescription) {
      try {
        const taskRef = doc(db, "userTask", id);
        await updateDoc(taskRef, { task: newTask, description: newDescription });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto">
      <h1 className="text-5xl font-bold font-[ZCOOL] my-3 text-center mb-5">Tasks</h1>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {tasks.map((task) => (
          <div
            className="card shadow-lg rounded-lg border-0 p-4 text-dark bg-light"
            key={task.id}
            style={{ width: "300px" }}
          >
            {/* User Avatar */}
            <div className="d-flex align-items-center mb-3">
              <img
                  src={user?.imageURL || user?.photoURL || "/default-user.png"}

                className="rounded-circle taskimage border"
                width={50}
                height={50}
                alt="User Avatar"
              />
              <h5 className="ms-3 mb-0">{task.task}</h5>
            </div>

            {/* Task Details */}
            <div className="border-top pt-3">
              <p className="fw-bold mb-2 text-violet-600">{task.description}</p>
              <p className="mb-1"><strong>Date:</strong> {task.date}</p>
              <p className="mb-1"><strong>Day:</strong> {task.day}</p>
              <p className="mb-1"><strong>Time:</strong> {task.time}</p>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditTask(task.id)}>Edit</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksAdded;
