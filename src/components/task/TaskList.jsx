import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm"; // Assuming this is a component for editing tasks.

const TaskList = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="mb-4">
        <strong>Due Date: </strong>
        {task.dueDate}
      </div>
      <div className="mb-4">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            task.isCompleted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
          Delete
        </button>
        <button onClick={() => onToggleComplete(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded">
          {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>
      {isEditing && (
        <EditTaskForm task={task} onEdit={onEdit} onClose={handleEditClose} />
      )}
    </div>
  );
};

export default TaskList;
