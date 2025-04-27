import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Button1 = ({ className, href, text, onClick }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <a className={className} href={href} onClick={onClick}>
        {text}
      </a>
    </>
  );
};

export default Button1;
