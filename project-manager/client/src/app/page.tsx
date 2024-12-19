import React from 'react';
import UserForm from './component/UserForm';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-200 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Welcome to <span className="text-indigo-600">Project Manager</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Manage your projects, tasks, and users effortlessly. Streamline your workflow and boost productivity with ease.
        </p>
        
        {/* User Form Section */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Create a New User</h2>
          <UserForm />
        </div>
      </div>
    </main>
  );
};

export default Home;
