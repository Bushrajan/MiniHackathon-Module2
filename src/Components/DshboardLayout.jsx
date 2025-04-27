// import React from "react";

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <nav>
//           <ul>
//             <li>Feed</li>
//             <li>Create Post</li>
//             <li>Profile</li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="content">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app"; 

const firebaseConfig = {
    apiKey: "AIzaSyD73twY9s1cVwAwbNT-C3Lt9N8y5u6KWT4",
    authDomain: "pro1-341d6.firebaseapp.com",
    projectId: "pro1-341d6",
    storageBucket: "pro1-341d6.firebasestorage.app",
    messagingSenderId: "644727580116",
    appId: "1:644727580116:web:8d80f885a4e50f2c7aa241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const Dshboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchPosts();
  }, []);

  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const addPost = async () => {
    await addDoc(collection(db, "posts"), { title: "New Post", content: "Content here" });
  };

  return (
    <div>
      <button onClick={handleSignup}>Signup</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={addPost}>Add Post</button>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dshboard;
