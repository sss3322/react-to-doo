import { useIndexedDB } from "react-indexed-db-hook";

const TASK_STORE = "tasks";

export const useTodoDB = () => {
  const { add, update, getAll, getByID, deleteRecord } = useIndexedDB(TASK_STORE);

  const getAllTasks = async () => {
    try {
      const tasks = await getAll();
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const addTask = async (taskData) => {
    try {
      const id = await add(taskData);
      console.log("Task added successfully", id);
      return id;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const task = await getByID(id); // Get existing task by ID
      if (!task) {
        throw new Error("Task not found");
      }
      const updatedTask = { ...task, ...taskData }; // Merge old task data with new data
      await update(updatedTask); // Update the task in IndexedDB
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteRecord(id);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted }; // Toggle the completion status
      await update(updatedTask); // Update the task in IndexedDB
      console.log("Task completion status updated");
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  };

  return {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};
