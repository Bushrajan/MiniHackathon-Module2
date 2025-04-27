import React from "react";
import Calendar from "./Calendercomponent";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full  h-screen  px-4 py-24 mx-auto max-w-7xl">
      <div className="mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="text-4xl  mb-5 font-extrabold leading-none font-[ZCOOL] text-white md:text-6xl md:tracking-tight uppercase tracking-tighter ">
          Your productivity, your way!{" "}
          <span className=" text-violet-500 lg:inline">Organize </span>,{" "}
          <span className=" text-violet-500 lg:inline">plan</span>, and{" "}
          <span className=" text-violet-500 lg:inline">execute</span> with ease.
        </h1>

        <div className=" mt-3">
          <Calendar />
        </div>
        <div className="container mt-5 mx-auto">
          <Link
            className="p-3 border button rounded  font-bold"
            to={"/addtask"}
          >
            Add Task
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
