// /app/projects/[id]/page.tsx

'use client';  // Mark this as a client component

import React from 'react';
import { useParams } from 'next/navigation';  // Use useParams for Next.js 13+

const projects = [
  { id: 1, name: 'Project 1', description: 'Full description of Project 1' },
  { id: 2, name: 'Project 2', description: 'Full description of Project 2' },
  { id: 3, name: 'Project 3', description: 'Full description of Project 3' },
];

const ProjectDetails: React.FC = () => {
  const { id } = useParams();  // Get the id from the URL

  const project = projects.find((project) => project.id.toString() === id);

  if (!project) {
    return <div className="text-center text-xl text-red-600">Project not found</div>;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 min-h-screen p-8 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-3xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">{project.name}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>
        <div className="flex justify-center pt-6">
          <button
            className="py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
