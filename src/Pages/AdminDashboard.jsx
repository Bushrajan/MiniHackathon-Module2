import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase/firebase.config";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    imageURL: "",
    isActive: false,
    role: "",
  });

  // Fetch all users with real-time updates
  useEffect(() => {
    const ref = collection(db, "users");
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  // Open Edit Modal
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setEditData(user);
    setShowModal(true);
  };

  // Handle input changes in the edit modal
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) =>
      setEditData({ ...editData, imageURL: e.target.result });
    reader.readAsDataURL(file);
  };

  // Save edited user details (Admin & Users can edit)

  const updateUserDetails = async () => {
    try {
      const updatedFields = {};

      // Check which fields have changed and only update those
      if (editData.name !== selectedUser.name) {
        updatedFields.name = editData.name;
      }
      if (editData.email !== selectedUser.email) {
        updatedFields.email = editData.email;
      }
      if (editData.role !== selectedUser.role) {
        updatedFields.role = editData.role;
      }
      if (editData.imageURL !== selectedUser.imageURL) {
        updatedFields.imageURL = editData.imageURL;
      }
      if (editData.isActive !== selectedUser.isActive) {
        updatedFields.isActive = editData.isActive;
      }

      // Only update Firestore if there's a change
      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(doc(db, "users", selectedUser.id), updatedFields);
      }

      setShowModal(false);
      console.log("User updated successfully:", updatedFields);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user in real-time
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <div className="container">
      <h2 className="text-center pt-4">Admin Dashboard</h2>

      <div className="container">
        <table className="table text-center mt-5">
          <thead className="bg-light text-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.imageURL || "/google.png"}
                      alt="User"
                      width="40px"
                      height="40px"
                      className="rounded-circle border"
                    />
                  </td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.isActive ? "Active" : "Blocked"}</td>
                  <td>{user.role || "User"}</td>
                  <td>
                    <Button 
                      style={{ width: "45px" }}
                      onClick={() => handleShowModal(user)}
                      className="btn btn-secondary"
                    >
                      <img src="/edit-button.png" alt="img" className="img-fluid" />
                    </Button>
                    <Button
                      variant="danger"
                      style={{ width: "45px" }}
                      className="  ms-1"
                      onClick={() => deleteUser(user.id)}
                    >
                      <img
                        src="/delete.png"
                        alt="img"
                        className="img-fluid  "
                      />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <span className="loader"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal for Editing Users */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                className="mb-3 "
                value={editData.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                className="mb-3 "
                value={editData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                className="mb-3 "
                value={editData.role}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                className="mt-3"
                checked={editData.isActive}
                onChange={() =>
                  setEditData({ ...editData, isActive: !editData.isActive })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={updateUserDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
