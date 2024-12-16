import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../App.css';
import { deleteTask } from '../components/Api/PostApi';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [tasks, setTasks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
    console.log("Logged In User:", user); // Debugging: Check if the user is correctly fetched
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User LoggedOut');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleView = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
        if(error.message === 'No authentication token found'){
            navigate('/login');
        }else{
            console.log('Error deleting task', error);
        }     
    }
  };

  const handleUpdate = (id) => {
    navigate(`/editTask/${id}`);
  };

  const fetchTasks = async () => {
    try {
      const url = 'https://crhk9f-8080.csb.app/tasks';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setTasks(result);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCreateTask = () => {
    navigate('/createTask');
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-container">
      <header>
        {/* Check if loggedInUser exists */}
        {loggedInUser ? (
          <>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </header>

      <div className='create-task-container'>
        <h2>Create New Task</h2>
        <button onClick={handleCreateTask} className='create-task-button'>Create Task</button>
      </div>

      <div className="task-list">
        {tasks &&
          tasks.map((task) => (
            <div className="task-item" key={task._id}>
              <div className="task-details">
                <span className="task-title">{task.title}</span>
                <span className="task-status">{task.status}</span>
                <span className="task-due-date">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </span>
              </div>
              <div className="task-actions">
                <button className="view-button" onClick={() => handleView(task._id)}>
                  View
                </button>
                <button className="update-button" onClick={() => handleUpdate(task._id)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
