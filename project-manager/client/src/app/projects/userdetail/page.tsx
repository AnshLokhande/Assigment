"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Data {
  id: number;
  name: string;
  email: string;
  project_id: number;
}

const UserTablePage: React.FC = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // Form state for popup
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    project_id: '',
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreateButtonClick = () => {
    setShowPopup(true);
  };

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/graphql',
        {
          query: `
            mutation {
              addUser(
                id: ${form.id},
                name: "${form.name}",
                email: "${form.email}",
                project_id: ${form.project_id}
              ) {
                id
                name
                email
                project_id
              }
            }
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newUser = response.data.data.addUser;
      setData((prevData) => (prevData ? [...prevData, newUser] : [newUser])); // Update the table with the new user
      setShowPopup(false); // Close popup
      setForm({ id: '', name: '', email: '', project_id: '' }); // Reset form
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user');
    }
  };

  useEffect(() => {
    axios
      .post(
        'http://localhost:3000/graphql',
        {
          query: `
            query {
              users {
                id
                name
                email
                project_id
              }
            }
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setData(response.data.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-teal-50 via-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">User and Project Overview</h1>
      <table className="table-auto w-full bg-white shadow-xl rounded-lg border border-gray-300">
        <thead className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold">User ID</th>
            <th className="px-6 py-3 text-sm font-semibold">User Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Email ID</th>
            <th className="px-6 py-3 text-sm font-semibold">Project ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data?.map((user) => (
            <tr key={user.id} className="border-t hover:bg-indigo-100 transition-all duration-300">
              <td className="px-6 py-4 text-sm">{user.id}</td>
              <td className="px-6 py-4 text-sm">{user.name}</td>
              <td className="px-6 py-4 text-sm">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.project_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCreateButtonClick}
          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition"
        >
          Create User
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-black">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full border border-indigo-200">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 text-center">Create New User</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Fill in the details below to add a new user to the system.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  type="number"
                  name="id"
                  value={form.id}
                  onChange={handleInputChange}
                  placeholder="Enter User ID"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter User Name"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email ID"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">Project ID</label>
                <input
                  type="number"
                  name="project_id"
                  value={form.project_id}
                  onChange={handleInputChange}
                  placeholder="Enter Project ID"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 shadow"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveButtonClick}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTablePage;
