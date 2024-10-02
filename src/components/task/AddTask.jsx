import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTodoDB } from "../../utils/db";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.string().required("Due date is required"),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { addTask } = useTodoDB();

  const onSubmit = async (data) => {
    try {
      const taskData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        isCompleted: false,
      };
      await addTask(taskData);
      toast.success("Task added successfully");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 md:px-0">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Task</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
