import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { db, auth } from "../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthForm = () => {
  const [formType, setFormType] = useState("signup");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: null,
    isActive: true,
    isAdmin: false,
    isbookmark_added: false,
    isfriend: false,
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [user, setUser] = useState(null);
  // const [alluser, allsetUser] = useState([]); for friends

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      let imageUrl = signupData.imageURL || "/default-user1.png";

      if (signupData.image) {
        imageUrl = await uploadImageToCloudinary(signupData.image);
        console.log("Cloudinary Image URL3:", imageUrl);
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      await updateProfile(userCredential.user, {
        displayName: signupData.name,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: signupData.name,
        email: signupData.email,
        imageURL: imageUrl,
        isActive: true,
        isAdmin: false,
        isbookmark_added: false,
        date: new Date().toISOString().split("T")[0],
        loginTime: new Date().toLocaleTimeString(),
      });
      
      toast.success("Signup successful!");
      console.log(
        "Firestore Save Status:",
        await getDoc(doc(db, "users", userCredential.user.uid))
      );
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pro1hackathon"); // Replace with your Cloudinary preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxnhnrmlr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary Error:", errorData);
        throw new Error(`Image upload failed: ${errorData.error.message}`);
      }

      const data = await response.json();
      console.log("Cloudinary Upload Response:", data);

      if (!data.secure_url) {
        throw new Error("Image upload failed, secure_url not found.");
      }

      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Image Upload Failed:", error);
      toast.error(`Image upload failed: ${error.message}`);
      return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formType === "login"
      ? setLoginData({ ...loginData, [name]: value })
      : formType === "forgot"
      ? setForgotPasswordEmail(value)
      : setSignupData({ ...signupData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSignupData({ ...signupData, image: file });
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please select a valid image file (PNG, JPG)");
    }
  };

  const handleSocialAuth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const socialUser = result.user;

      // **Check if user already exists in Firestore**
      const userRef = doc(db, "users", socialUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: socialUser.uid,
          name: socialUser.displayName || "Unknown User",
          email: socialUser.email,
          imageURL: socialUser.photoURL || "/google.png",
          isActive: true,
          isUser: true,
          isfriend: false,
          isbookmark_added: false,
          date: new Date().toISOString().split("T")[0],
          loginTime: new Date().toLocaleTimeString(),
        });
      }

      setUser({
        uid: socialUser.uid,
        name: socialUser.displayName,
        email: socialUser.email,
        imageURL: socialUser.photoURL,
      });

      toast.success("Login Successful!");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  // **Login Handler**
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  // **Forgot Password Handler**
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      toast.success("Password Reset Email Sent!");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="container mt-5 pt-lg-3 form mx-auto  ">
      {formType === "login" && (
        <div className="card px-lg-5 mb-4 p-1  bg-black text-light">
          <h1 className="text-center m-3 mb-4">Login Form</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              value={loginData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn mt-3 fw-bold button w-100">
              Login
            </button>
          </form>

          <p className="mt-4 mb-0 text-center">
            Forgot password?{" "}
            <span className="text-danger" onClick={() => setFormType("forgot")}>
              Click here
            </span>
          </p>
          <hr />
          <span className="text-center">
            Don't have an account?{" "}
            <span
              className="text-warning"
              onClick={() => setFormType("signup")}
            >
              Signup
            </span>
          </span>
          <div className="d-flex gap-2 justify-content-center mt-3">
            <button
              className="btn px-3 btn-outline-danger"
              onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
            >
              <img
                src="/google.png"
                alt="Google Login"
                className="img-fluid faicons-images"
              />
            </button>
            <button
              className="btn px-3 btn-outline-light"
              onClick={() => signInWithPopup(auth, new GithubAuthProvider())}
            >
              <img
                src="/github.png"
                alt="GitHub Login"
                className="img-fluid faicons-images"
              />
            </button>
          </div>
        </div>
      )}

      {formType === "signup" && (
        <div className="card  px-lg-5 mb-4 p-1 bg-black text-light">
          <h1 className="text-center m-3 mb-4">Signup Form</h1>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control mb-2"
              value={signupData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              value={signupData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2"
              value={signupData.password}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleImageChange}
            />

            <button type="submit" className="btn fw-bold button mt-3 w-100">
              Signup
            </button>
          </form>

          <p className="mt-4 mb-0 text-center">
            Forgot password?{" "}
            <span className="text-danger" onClick={() => setFormType("forgot")}>
              Click here
            </span>
          </p>
          <hr />
          <span className="text-center">
            Don't have an account?{" "}
            <span className="text-warning" onClick={() => setFormType("login")}>
              Login
            </span>
          </span>

          <div className="d-flex gap-2 justify-content-center mt-3">
            <button
              className="btn px-3 btn-outline-danger"
              onClick={() => handleSocialAuth(new GoogleAuthProvider())}
            >
              <img
                src="/google.png"
                alt="Google Login"
                className="img-fluid faicons-images"
              />
            </button>
            <button
              className="btn px-3 btn-outline-light"
              onClick={() => handleSocialAuth(new GithubAuthProvider())}
            >
              <img
                src="/github.png"
                alt="GitHub Login"
                className="img-fluid faicons-images"
              />
            </button>
          </div>
        </div>
      )}

      {formType === "forgot" && (
        <div className="card  px-lg-5 mb-4 p-1 bg-black text-light">
          <h1 className="text-center m-3 mb-4">Forgot Password</h1>
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control mb-2"
              value={forgotPasswordEmail}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn mt-1 fw-bold  button w-100">
              Reset Password
            </button>
            <hr className="m-5 mb-3" />
            <p className="mt-3 text-center">
              back to{" "}
              <span
                className="text-warning"
                onClick={() => setFormType("login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
