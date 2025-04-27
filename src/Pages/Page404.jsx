import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center mx-auto   ">
 
      <div className="card-body text-center shadow-lg rounded animated-fade p-lg-5 px-3">
        <img src="/404.png" alt="GitHub Icon" className="img-fluid     text-center mx-auto" width={300}  />
         
        <h1 className="text-center fs-3 mt-5 fw-bold mb-3"> 404 Page Not Found</h1>
        <p className="  mb-3">The page you are looking for does not exist.</p>
        <Link to="/" className="btn button   btn-lg mb-4">
          Go to Home
        </Link>
      
    </div>
  </div>
  );
};

export default Page404;
