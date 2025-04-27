import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Components/DshboardLayout";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <span>{post.category}</span>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
