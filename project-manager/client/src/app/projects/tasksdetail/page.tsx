"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
};

type Task = {
  task_id: number;
  name: string;
  project_id:number;
  description: string;
  assigned_user:string;
};
type Project={
  project_id: number;
  name: string;
}

type Data = {
  id: number;
  name: string;
  email: string;
  project_id: number;
};


const UserTablePage: React.FC = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [tasks, settasks] = useState<Task[] | null>(null);
  const [project, setprojects] = useState<Project[] | null>(null);
  
  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/graphql",
        {
          query: `
            query {
              users {
                id
                name
                email
                project_id
              }
                tasks{
                task_id
                name
                description
                project_id
                assigned_user
                }
                projects{
                project_id
                name
                }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setData(response.data.data.users);
        settasks(response.data.data.tasks);
        setprojects(response.data.data.projects);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gradient-to-r from-teal-100 to-indigo-200 min-h-screen text-black">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
        User and Project Overview
      </h1>

      {/* User Table */}
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Assigned Users in Projects</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg border border-gray-300">
            <thead className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white">
              <tr>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">User ID</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">User Name</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Project ID</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Email ID</th>
              </tr>
            </thead>
            <tbody>
            {data
              ?.filter((user) => user.project_id !== null) // Filter out rows with null project_id
             .map((user) => (
             <tr
                  key={user.id}
                  className="border-t hover:bg-indigo-100 transition-colors duration-300"
                >
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">
                    {user.id}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">
                    {user.project_id}
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">
                        {user.email}
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Task Table */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Task List Overview</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg border border-gray-300">
            <thead className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white">
              <tr>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Task ID</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Task Name</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Task Description</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Project ID</th>
                <th className="px-4 py-2 text-xs sm:text-sm font-medium">Assigned User</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) =>(
                    <tr
                      
                      className="border-t hover:bg-indigo-100 transition-colors duration-300"
                    >
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">{task.task_id}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">{task.name}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">{task.description}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">{task.project_id}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-800 text-center">{task.assigned_user}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTablePage;
