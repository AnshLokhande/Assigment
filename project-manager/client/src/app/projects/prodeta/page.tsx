import React from 'react';

interface Project {
  id: string;
  name: string;
  assignedUsers: string[];
}

const ProjectDetails: React.FC = () => {
  const project: Project = {
    id: '1',
    name: 'Example Project',
    assignedUsers: ['User A', 'User B'],
  };

  return (
    <div className="p-8 bg-gradient-to-r from-teal-50 via-indigo-50 to-blue-50 rounded-lg shadow-xl">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Project Details</h2>
      <p className="mb-4 text-gray-700">
        <span className="font-semibold text-gray-900">Project Name:</span> {project.name}
      </p>
      <p className="mb-4 text-gray-700">
        <span className="font-semibold text-gray-900">Description:</span> This is a sample project description.
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-gray-900">Assigned Users:</span> {project.assignedUsers.join(', ')}
      </p>
    </div>
  );
  
};

export default ProjectDetails;
