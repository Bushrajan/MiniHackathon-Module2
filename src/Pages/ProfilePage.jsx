import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase/firebase.config.js";
import {
  getAuth,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    imageURL: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Firestore se user data fetch karna
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        toast.error("User data not found in Firestore.");
      }
    } catch (error) {
      toast.error(`Error fetching user data: ${error.message}`);
    }
  };

  // 🔹 Profile Image Update Karna
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image format! Use PNG or JPG.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target.result;
      setUserData({ ...userData, imageURL: imageUrl });

      try {
        await updateProfile(currentUser, { photoURL: imageUrl });
        await updateDoc(doc(db, "users", currentUser.uid), {
          imageURL: imageUrl,
        });
        toast.success("Profile image updated successfully!");
      } catch (error) {
        toast.error(`Error updating profile image: ${error.message}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // 🔹 User Name & Email Update + Verification
  const handleUserSettingUpdate = async () => {
    if (!currentUser) return;

    try {
      await updateProfile(currentUser, { displayName: userData.name });
      await updateEmail(currentUser, userData.email);
      await sendEmailVerification(currentUser);
      toast.success(
        "Verification email sent! Please verify before updating Firestore."
      );
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to update your password!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await updatePassword(currentUser, newPassword);
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(`Error updating password: ${error.message}`);
    }
  };

  // 🔹 Firestore Update After Email Verification
  const updateFirestoreData = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: userData.name,
        email: userData.email,
        emailVerified: true,
      });
      toast.success("User details updated successfully in Firestore!");
    } catch (error) {
      toast.error(`Error updating Firestore: ${error.message}`);
    }
  };

  // 🔹 Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      toast.error(`Sign out failed: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5 text-white rounded pt-lg-5 p-1">
      <h1 className="text-center fs-1 fw-bold mb-5">User Profile</h1>
      <ToastContainer position="top-center" autoClose={2000} />

      {currentUser ? (
        <div className="mx-auto mb-5 pb-5 mt-4">
          <Form className="gap-5 row d-flex mx-auto  justify-content-center align-items-center">
            {!showDetails ? (
              <div className="col-md-5 text-center  border p-lg-5 p-2 rounded shadow-lg">
                <Form.Group>
                  <div className="text-center mb-3 mx-auto d-flex flex-column align-items-center">
                    <img
                      src={
                        userData.imageURL ||
                        localStorage.getItem("profileImage") ||
                        "/default-user1.png"
                      }
                      width=" 70"
                      height="70"
                      className="img-thumbnail cursor-pointer"
                      alt="Profile"
                    />

                    <img
                      src="/edit-button.png"
                      className="position-absolute edit-button2"
                      onClick={() =>
                        document.getElementById("imageUpload")?.click()
                      }
                    />

                    <Form.Control
                      type="file"
                      accept="image/*"
                      className="d-none"
                      id="imageUpload"
                      onChange={handleImageChange}
                    />
                  </div>
                </Form.Group>
                <p>
                  <span className="fw-bold">Name:</span>{" "}
                  {userData.name || "User-Name"}
                </p>
                <p>
                  <span className="fw-bold">Email:</span>{" "}
                  {userData.email || "User-Email"}
                </p>

                <p>
                  <span className="fw-bold">About me:</span> I am genius and a
                  software engineer. Lorem ipsum quaerat...{" "}
                </p>

                <div className="d-flex mx-auto mt-4">
                  <button
                    className="btn d-flex mx-auto btn-danger"
                    onClick={handleSignOut}
                  >
                    <img
                      src="/signout.png"
                      alt="signout"
                      className="faicons-images"
                      height="27"
                    />
                    <span>&nbsp;&nbsp;&nbsp;Signout</span>
                  </button>

                  <button
                    className="btn d-flex mx-auto btn-secondary"
                    onClick={() => setShowDetails(true)}
                  >
                    <img
                      src="/settings.png"
                      alt="Settings"
                      className="faicons-images"
                      height="27"
                    />
                    <span>&nbsp;&nbsp;&nbsp;Settings</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="container mx-auto">
                <div className="col-md-12  d-flex flex-column  flex-lg-row gap-5 justify-content-center align-items-center">
                  <div className="col-md-5 p-lg-5 form2 shadow-lg rounded-5">
                    <h4 className="text-center pb-3 fw-bold">Detail Setting</h4>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Button
                      variant="dark"
                      className="w-100 mt-5"
                      onClick={handleUserSettingUpdate}
                    >
                      Update & Verify Email
                    </Button>
                    <Button
                      variant="success"
                      className="w-100 mt-3"
                      onClick={updateFirestoreData}
                    >
                      Update Firestore (After Email Verified)
                    </Button>
                    <Button
                      variant="danger"
                      className="w-100 mt-3"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>

                  <div className="col-md-5   p-lg-5 form2  p-2  fw-bold shadow-lg rounded-5">
                    <h4 className="text-center   fw-bold">Password Setting</h4>

                    <Form.Group controlId="formPassword">
                      <Form.Label className="mt-3">Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pe-5" // Ensure padding-right space for eye icon
                        />
                        <span
                          className="position-absolute top-50 end-0 translate-middle-y me-3"
                          style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#6c757d",
                          }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "🔒" : "👁"}
                        </span>
                      </div>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="mt-3">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="dark"
                      className="w-100 button mt-5"
                      onClick={handleUpdatePassword}
                      disabled={!currentUser} // ✅ Agar user logged in nahi hai to disable ho jaye
                    >
                      Update Passwords Setting
                    </Button>
                  </div>
                </div>

                <div className="mt-5 text-center justify-content-center align-items-center">
                  <Button
                    variant="secondary"
                    className="w-75 button1  mt-3"
                    onClick={() => setShowDetails(false)}
                  >
                    Back to Profile
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      ) : (
        <div className="card mx-auto shadow-lg form2  rounded animated-fade p-lg-5 ">
          <div className="card-body  text-center ">
            <img
              src="/default-user1.png"
              alt="user"
              className="img-fluid img-thumbnail rounded-circle text-center mx-auto"
              width={150}
            />
            <h2 className="text-danger fw-bold mt-3">No User Logged In</h2>
            <p className="text-muted">Please sign in to continue.</p>
            <Link to="/authForm" className="btn btn-danger button btn-lg mb-4">
              Go to Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
