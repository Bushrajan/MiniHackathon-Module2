import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; // Ensure this is correctly imported
import { Modal, Button, Form } from "react-bootstrap";

const TasksAdded = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editData, setEditData] = useState({});
  const auth = getAuth();

  // Fetch current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  

  // Fetch all users' tasks from Firestore, then store in localStorage
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "userTask"));
      const taskData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(taskData);
      setFilteredTasks(taskData);
      console.log(taskData);
      
      localStorage.setItem("tasks", JSON.stringify(taskData));
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
      setFilteredTasks(storedTasks);
    } else {
      fetchTasks();
    }
  }, []);

  // Search Filter by task name
  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  // Sorting Function (Ascending & Descending)
  const handleSort = (order) => {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      return order === "asc"
        ? a.task.localeCompare(b.task)
        : b.task.localeCompare(a.task);
    });
    setFilteredTasks(sortedTasks);
    setSortOrder(order);
  };

  // Open Edit Modal
  const handleShowModal = (task) => {
    setSelectedTask(task);
    setEditData({ ...task });
    setShowModal(true);
  };

  // Handle input changes in edit modal
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
  };

  // Update task in local storage
  const handleUpdateTask = () => {
    if (!selectedTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, ...editData } : task
    );

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setShowModal(false);
  };

  // Delete task in local storage
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  console.log(JSON.parse(localStorage.getItem("tasks")));
  return (
    <div className="container mx-auto">
      <h1 className="text-center my-3">All Users' Tasks</h1>

      {/* Search & Sorting Controls */}
      <div className="d-flex justify-content-center mb-3 gap-2">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by task name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={() => handleSort("asc")}>Sort A-Z</Button>
        <Button variant="outline-secondary" onClick={() => handleSort("desc")}>Sort Z-A</Button>
      </div>

      {/* Task Cards */}
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card shadow-lg p-4 text-dark bg-light" style={{ width: "300px" }}>
            <div className="d-flex align-items-center mb-3">
              <img src={task.imageURL || "/task.png"} className="rounded-3 border-black" width={50} height={50} alt="User Avatar" />
              <h5 className="ms-3 mb-0">{task.task}</h5>
            </div>
            <div className="border-top pt-3">
              <p className="fw-bold mb-2">{task.description}</p>
              <p className="mb-1 mt-5"><strong>Date:</strong> {task.date}</p>
              <p className="mb-1"><strong>Day:</strong> {task.day}</p>
              <p className="mb-1"><strong>Time:</strong> {task.time}</p>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(task)}>Edit</Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedTask && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-black text-white">
            <Form>
              <Form.Group>
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  className="mb-3"
                  name="task"
                  value={editData.task}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  className="mb-3"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleUpdateTask}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TasksAdded;
