import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, XIcon, PlusIcon, ClipboardListIcon, PencilIcon, LogoutIcon } from '@heroicons/react/solid';
import { fetchUserProfile } from '../api/userApi'; 
import { createTask, fetchTasks, updateTaskAsDone, deleteTaskApi } from '../api/taskApi';

function Task() {
  const [profile, setProfile] = useState(null); 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        try {
          const data = await fetchUserProfile(token);
          if (data) {
            setProfile({
              name: data.data.name,
              profileUrl: data.data.photo_url,
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        }
      }
    };

    fetchProfile();
  }, []);

  // Fetch all tasks
  useEffect(() => {
    const fetchAllTasks = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await fetchTasks(token);
          console.log("Tasks fetched from API:", data);
          if (data && data.data) {
            setTasks(
              data.data.map(task => ({
                id: task.id || task._id,
                description: task.title || task.description || "No Title",
                done: task.isDone || false,
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
  
    fetchAllTasks();
  }, []);
  

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const token = localStorage.getItem('token');
      const taskData = { title: newTask };
  
      try {
        const createdTask = await createTask(token, taskData);
        if (createdTask) {
          setTasks(prevTasks => [
            ...prevTasks,
            {
              id: createdTask.data.id || createdTask.data._id, 
              description: createdTask.data.title,
              done: false,
            },
          ]);

          setNewTask('');

        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const toggleTaskStatus = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token not found");
      return;
    }
  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: true } : task
      )
    );
  
    try {
      await updateTaskAsDone(token, id);
    } catch (error) {
      console.error("Error toggling task status:", error);
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, done: false } : task
        )
      );
    }
  };
  
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const deletedTask = await deleteTaskApi(token, id); 
      if (deletedTask) {
        setTasks(tasks.filter((task) => task.id !== id)); 
        console.log('Task deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="flex w-full max-w-4xl space-x-8">

         {/* Profile Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3 h-full min-h-[450px] flex flex-col items-center justify-center space-y-6">
          {profile ? (
            <>
              <img
                className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-xl mb-4"
                src={profile.profileUrl}
                alt="Profile"
              />
              <h2 className="text-2xl text-white font-semibold text-center">
                Welcome Back,
                <span className="block text-purple-400">{profile.name}</span>
              </h2>
            </>
          ) : (
            <h2 className="text-2xl text-white font-semibold text-center">Loading Profile...</h2>
          )}
          <div className="flex flex-col items-center space-y-3 w-full mt-6">
            <Link to="/UpdateProfile">
              <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">
                <PencilIcon className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            </Link>
            <Link to="/">
              <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                <LogoutIcon className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md w-2/3 space-y-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Add a new task"
            />
            <button
              onClick={handleAddTask}
              className="p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold flex items-center">
              <ClipboardListIcon className="w-5 h-5 mr-2" />
              Task to do - {tasks.filter((task) => !task.done).length}
            </h3>
            {tasks.filter((task) => !task.done).map((task) => (
              <div key={task.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-md mb-4 hover:bg-gray-600">
                <p className="text-white">{task.description}</p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="text-green-400 hover:text-green-500"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold flex items-center">
              <ClipboardListIcon className="w-5 h-5 mr-2" />
              Done - {tasks.filter((task) => task.done).length}
            </h3>
            {tasks.filter((task) => task.done).map((task) => (
              <div key={task.id} className="p-4 bg-green-500 text-white rounded-md mb-4 line-through">
                {task.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;