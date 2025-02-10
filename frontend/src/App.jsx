import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx';
import Task from './pages/Task.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/task" element={<Task />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
