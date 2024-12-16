import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTaskById } from '../components/Api/PostApi'
import './taskDetails.css';

const TaskDetails = () => {

    const {id} = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async() => {
           try{
              const response = await getTaskById(id);
              setTask(response.data);
              setLoading(false);
           }catch(error){
              setError("Failed to fetch task");
              setLoading(false);
           }
        }
        fetchTask();
    }, [id])

    if(loading){
        return <div>Loading .........</div>
    }
    if(error){
        return <div>Error ........</div>
    }

    return (
        <div className="task-details-container">
          {task ? (
            <>
              <h1>Task Details</h1>
              <div className="task-details">
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Status:</strong> {task.status || "Pending"}</p>
                <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
              </div>
              <button className="back-button" onClick={() => navigate("/home")}>Back to tasks</button>
            </>
          ) : (
            <p>Loading task details...</p>
          )}
        </div>
      );
}

export default TaskDetails