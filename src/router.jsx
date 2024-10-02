import { createBrowserRouter } from "react-router-dom";
// import Hero from "./components/Hero";
import CommonLayout from "./layout/CommonLayout";
// import Login from "./components/auth/login";
// import Register from "./components/auth/register";
// import UserLayout from "./layout/UserLayout";
import TaskManagement from "./components/task/TaskManagement"; // Component to manage tasks
// import ProtectedRoute from "./components/common/ProtectedRoute";
import EditTaskForm from "./components/task/EditTaskForm"; // Component to edit tasks
import AddTask from "./components/task/AddTask"; // Component to add new tasks
import TaskList from "./components/task/TaskList";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        children: [
          { path: "", element: <TaskManagement /> }, // Main task management page
          { path: "/tasks/add", element: <AddTask /> },
          
          { path: "edit/:id", element: <EditTaskForm /> }, // Route to edit a task
        ],
      },
    ],
  },
]);

export default router;
