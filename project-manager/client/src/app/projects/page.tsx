// /app/projects/page.tsx

'use client';  // Mark this as a client component

import React from 'react';
import Link from 'next/link';  // For navigation

const projects = [
  { id: 1, name: 'Project 1', description: 'Description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  { id: 3, name: 'Project 3', description: 'Description of Project 3' },
];

const ViewProjects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        All Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {project.name}
            </h3>
            <p className="text-gray-600 text-sm mb-6">{project.description}</p>
            <Link
              href={`/projects/${project.id}`}
              className="inline-block py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProjects;