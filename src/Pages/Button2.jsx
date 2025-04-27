import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Button2 = ({ text, onClick, className }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <button
        onClick={onClick}
        className={className}
        data-aos="zoom-in-down"
        data-aos-duration="3000"
      >
        {text}
      </button>
    </>
  );
};

export default Button2;
