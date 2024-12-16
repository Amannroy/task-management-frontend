import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
//import Home2 from './pages/Home2';
import NewTask from './components/NewTask';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/EditTask';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home />}/>}/>
        <Route path="/createtask" element={<NewTask />} />
        <Route path="/editTask/:id" element={<EditTask />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>

    </div>
  );
}

export default App;
