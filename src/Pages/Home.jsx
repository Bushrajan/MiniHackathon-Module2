import Hero from "../Pages/Hero";
import CompletionTask from "./CompletionTask";

const Home = () => {
  return (
    <div className="p-lg-5 p-2 home-page  text-white text-shadow-teal-400">
      <Hero />

      <CompletionTask />

    </div>
  );
};

export default Home;
