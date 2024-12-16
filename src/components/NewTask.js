import React, { useState } from "react";
import { createTask } from "../components/Api/PostApi";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import './newTask.css';

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Data Submit
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const result = await createTask(newTask);
      if(result){
        handleSuccess("Task Added Successfully!");
        setNewTask({
            title: "",
            description: "",
            dueDate: "",
        })
        navigate('/home');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="myPost">
        <h1>Task Management</h1>

        <form onSubmit={handleAddTask}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleChange}
            required
          />

          <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          required
          />

          <button type="submit">Add Task</button>
          <button type="button" onClick={() => navigate("/home")}  style={{marginLeft: "10px"}}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default NewTask;
