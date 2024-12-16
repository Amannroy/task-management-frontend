import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getTaskById } from "../components/Api/PostApi";
import './editTask.css';

const EditTask = () => {
  const navigation = useNavigate();

  const { id: taskId } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data by id(First need to show the data in the form)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
        //  console.log(response.data.title);
        setTask({
          title: response.data.title || "",
          description: response.data.description || "",
          dueDate: response.data.dueDate ? response.data.dueDate.split("T")[0] : "",
          status: response.data.status || "Pending",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error to fetching task, error");
        setError("Failed updating task details");
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editTask(taskId, task);
      console.log("Task updated successfully", response);
      alert("Task updated successfully!");
      navigation("/home");
    } catch (error) {
      console.log("Error updating task", error);
      setError("Failed to update the task");
    }
  };

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="myTask">
        <h1>Update Task</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={task.title}
              onChange={handleChange}
              required
            />

          
          <div>
            <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter Description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
          </div>
          

          <div>
            <label>Status:</label>
          <input
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          />

          </div>
          </div>

        
          <button type="submit">Update Task</button>
          <button type="button" onClick={() => navigation("/home")}  style={{marginLeft: "10px"}}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
