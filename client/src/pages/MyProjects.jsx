import React from "react";

export default function MyProjects() {
  // Dummy data for projects
  const projects = [
    { projectId: 1, title: "Web Development Project", client: "0xClientAddress1", budget: "1.5 ETH", approved: false },
    { projectId: 2, title: "Mobile App Development", client: "0xClientAddress2", budget: "2.0 ETH", approved: true },
    { projectId: 3, title: "Blockchain Integration", client: "0xClientAddress3", budget: "3.0 ETH", approved: false },
  ];

  const handleApprove = (projectId) => {
    // Logic to approve the project (to be implemented)
    alert(`Project ${projectId} approved!`);
  };

  return (
    <div className="p-4 flex justify-start">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-blue-100 rounded-lg shadow p-4 border border-blue-300">
              <h2 className="text-xl font-semibold text-blue-800">{project.title}</h2>
              <p className="mb-2 text-blue-600"><strong>Client:</strong> {project.client}</p>
              <p className="mb-2 text-blue-600"><strong>Budget:</strong> {project.budget}</p>
              <p className={`font-bold ${project.approved ? "text-green-500" : "text-red-500"}`}>
                {project.approved ? "Approved" : "Pending Approval"}
              </p>
              {!project.approved && (
                <button
                  onClick={() => handleApprove(project.projectId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Approve Project
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}