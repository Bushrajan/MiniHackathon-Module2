import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Page404 from "./Pages/Page404";
import AuthForm from "./Pages/AuthForm";
import AdminDashboard from "./Pages/AdminDashboard";
import ProfilePage from "./Pages/ProfilePage";
import AddTask from "./Pages/AddTask"; 
import TasksAdded from "./TaskAdded";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} /> {/* Home page */}
      <Route path="/addtask" element={<AddTask/>} /> {/* About page */}
      <Route path="/contact" element={<Contact/> } /> {/* contact page */}
      <Route path="/authForm" element={<AuthForm />} /> {/* Login page / signup page */}
      <Route path="/alltasks" element={<TasksAdded/>} /> {/* Login page / signup page */}
      <Route path="/admindashboard" element={<AdminDashboard />} /> {/* admin dashboard */} 
      <Route path="/profilepage" element={<ProfilePage/>} /> {/* profile page */}
      <Route path="*" element={<Page404 />} /> {/* 404 page */}
    </Route>
  )
);
 