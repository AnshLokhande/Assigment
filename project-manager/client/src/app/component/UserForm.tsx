'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();

  const handleNavigation = (path: string) => router.push(path);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username, email, projectName };
    console.log("User data:", userData);

    try {
      await axios.post('/api/create-user', userData);
      setShowPopup(true);
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Error creating user!');
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-8 px-4 rounded-lg text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div>
          <label htmlFor="projectName" className="block text-sm font-semibold mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your project name"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition duration-200 focus:ring-2 focus:ring-indigo-500"
          >
            Create User
          </button>
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        <button
          onClick={() => handleNavigation('/projects/tasksdetail')}
          className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Tasks Details
        </button>
        <button
          onClick={() => handleNavigation('/projects/projectdetail')}
          className="py-3 px-6 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Project Details
        </button>
        <button
          onClick={() => handleNavigation('/projects/userdetail')}
          className="py-3 px-6 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Users Details
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h4 className="text-lg font-bold text-gray-800">User Created Successfully!</h4>
            <p className="text-gray-600 my-4">The user has been created successfully.</p>
            <button
              onClick={handleClosePopup}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
