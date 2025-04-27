import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config.js";

const CompletionTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const q = query(collection(db, "tasks"), where("status", "==", "Done"));
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompletedTasks(tasks);
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div className="p-5 bg-violet-500 text-center rounded-lg shadow-md">

      <h2>Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> - Assigned to {task.assignedTo}
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed tasks yet!</p>
      )}
    </div>
  );
};

export default CompletionTask;
