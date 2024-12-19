"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
};

type Task = {
  id: number;
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
};

type Project = {
  id: number;
  name: string;
  description: string;
  assignedUsers: User[];  // Tasks are optional now
};

const ProjectPage: React.FC = () => {
  const [data, setData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post(
        'http://localhost:3000/graphql',
        {
          query: `
            query {
              projects {
                name
                description
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
        setData(response.data.data.projects);
        setLoading(false);
        console.log(response.data)
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-teal-100 to-indigo-200 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-10">Project Management</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data?.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{project.name}</h2>
            <p className="text-gray-700 mb-6">{project.description}</p>

            <div className="mb-6">
              <h3 className="text-gray-800 font-medium text-xl mb-2">Assigned Users:</h3>
              <ul className="list-disc ml-6 text-gray-600">
                {/* {project.assignedUsers.map((user) => (
                  <li key={user.id} className="text-md">{user.name}</li>
                ))} */}
              </ul>
            </div>

            {/* Render tasks only if they exist
            {project.tasks && project.tasks.length > 0 && (
              <div>
                <h3 className="text-gray-800 font-medium text-xl mb-2">Tasks:</h3>
                <ul className="list-disc ml-6 text-gray-600">
                  {project.tasks.map((task) => (
                    <li key={task.id} className="mb-4">
                      <strong className="text-lg text-gray-800">{task.name}</strong>: {task.description}
                      <span
                        className={`text-sm font-semibold ml-2 ${
                          task.status === 'Completed'
                            ? 'text-green-600'
                            : task.status === 'In Progress'
                            ? 'text-blue-600'
                            : 'text-red-600'
                        }`}
                      >
                        ({task.status})
                      </span>
                    </li>
                  ))}
                </ul>
            )}
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
