import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";

const schema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.string().required("Due date is required"),
});

const EditTaskForm = ({ task, onEdit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    },
  });

  const onSubmit = async (data) => {
    try {
      await onEdit(task.id, data); // Call the edit function
      toast.success("Task updated successfully");
      onClose(); // Close the edit form
    } catch (error) {
      toast.error("Error updating task: " + error.message);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-bold mb-4">Edit Task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Task Title</label>
          <input
            type="text"
            {...register("title")}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register("description")}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            {...register("dueDate")}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
