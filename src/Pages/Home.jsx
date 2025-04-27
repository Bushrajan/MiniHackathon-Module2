import Hero from "../Pages/Hero";
import TaskBoard from "../Pages/TaskBoard";
import CompletionTask from "./CompletionTask";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-lg-5 p-2 home-page  text-white text-shadow-teal-400">
      <Hero />

      <div className="text-center">
        <h1 className="text-5xl font-bold font-[ZCOOL] my-3 text-center mb-5">
          Welcome to Task Manager
        </h1>
        <p className="text-lg m-0">Manage your tasks efficiently!</p>
        <p className="text-lg m-0">Stay organized and productive.</p>
        <p className="text-lg m-0">Get started now!</p>
        <p className="text-lg m-0">Add your tasks and track your progress.</p>
      </div>

      <div className=" mt-5  text-center mb-5">
        <Link className="p-2 border button rounded  font-bold" to={"/addtask"}>
          😌 Add Task on your Task Board throught this link 😌
        </Link>
      </div>

      <div className="container mx-auto mb-5">
        <TaskBoard />
      </div>

      <div className="container mx-auto mb-5">
        <CompletionTask />
      </div>
    </div>
  );
};

export default Home;
