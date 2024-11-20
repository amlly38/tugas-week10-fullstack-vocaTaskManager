import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, XIcon, PlusIcon, ClipboardListIcon, PencilIcon, LogoutIcon } from '@heroicons/react/solid';

function Task() {
  const name = 'Amaliyah';
  const profileUrl = '../../public/profile.jpg';
  const listTasks = [
    { id: 1, description: 'To study React fundamentals', done: false },
    { id: 2, description: 'Write documentation for API endpoints', done: false },
    { id: 3, description: 'Prepare a presentation on project status', done: false },
    { id: 4, description: 'Fix bugs in the authentication module', done: false },
    { id: 5, description: 'Vocasia Fullstack Web Developer', done: false },
  ];

  const [tasks, setTasks] = useState(listTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = { id: tasks.length + 1, description: newTask, done: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="flex w-full max-w-4xl space-x-8">
        {/* Profile Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3 h-full min-h-[450px] flex flex-col items-center justify-center space-y-6">
          <img
            className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-xl mb-4"
            src={profileUrl}
            alt="Profile"
          />
          <h2 className="text-2xl text-white font-semibold text-center">
            Welcome Back, <span className="text-purple-400">{name}</span>
          </h2>

          {/* Centered Buttons */}
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
                    onClick={() => deleteTask(task.id)}
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
