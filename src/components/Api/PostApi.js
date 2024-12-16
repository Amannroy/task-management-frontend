import axios from "axios";

export const BasedUrl = 'https://crhk9f-8080.csb.app/';
const addUrl = 'https://crhk9f-8080.csb.app/tasks';


// Function to check if the token is available in localstorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if(!token){
        throw new Error("No authentication token found");
    }
    return {
        'Authorization': token,
    }
}

// Create Task
export const createTask = async(newTask) => {
     try{
        const headers = getAuthHeader(); // Getting Authorization header
        return await axios.post(`${addUrl}/`, newTask, {headers});
     }catch(error){
        console.error("Error creating task:", error);
        throw error;
     }
}

// Get all Tasks
export const getAllTasks = async() => {
       try{
         const headers = getAuthHeader(); // Getting Authorization header
         return await axios.get(`${addUrl}/`, {headers});
       }catch(error){
         console.log("Error fetching tasks", error);
         throw error;
       }
}

// Fet Task by ID
export const getTaskById = async(id) => {
       try{
          const headers = getAuthHeader(); // Getting Authorization header
          return await axios.get(`${addUrl}/${id}`, {headers});
       }catch(error){
          console.error("Error fetching task by ID:", error);
          throw error;
       }
}


// Delete Task
export const deleteTask = async (id) => {
    try{
        const headers  = getAuthHeader(); // Getting Authorization header
        return await axios.delete(`${addUrl}/${id}`, {headers});
    }catch(error){
        console.error("Error deleting task:", error);
        throw error;
    }
};
    
   
export const editTask = async(id, updateTask) => {
    try{
       const headers = getAuthHeader();
       const response = await axios.put(`${addUrl}/${id}`, updateTask, {headers});
       return response.data;
    }catch(error){
       console.error("Error updating task:", error);
       throw error;
    }
}