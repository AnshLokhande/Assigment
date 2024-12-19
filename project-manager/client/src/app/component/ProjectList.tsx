import React from 'react';

interface Project {
  id: string;
  name: string;
  assignedUsers: string[];
}

const ProjectList: React.FC = () => {
  const projects: Project[] = [
    { id: '1', name: 'Project 1', assignedUsers: ['User A', 'User B'] },
    { id: '2', name: 'Project 2', assignedUsers: ['User C'] },
  ];

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <span className="font-semibold">{project.name}</span> - Assigned Users: {project.assignedUsers.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
