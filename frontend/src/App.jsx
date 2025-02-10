import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Task from './pages/Task.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<Task />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
