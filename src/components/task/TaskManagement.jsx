import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { useTodoDB } from "../../utils/db";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const { getAllTasks, addTask, deleteTask, toggleTaskCompletion, updateTask } = useTodoDB();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks); // Update state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    navigate("/tasks/add");
  };

  const handleEditTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData); // Use the updateTask function
      fetchTasks(); // Fetch tasks again to reflect changes
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Fetch tasks again after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await toggleTaskCompletion(task); // Toggle completion
      fetchTasks(); // Fetch tasks again to reflect changes
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button
          onClick={handleAddTask}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskList
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
