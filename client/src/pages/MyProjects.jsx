import React, { useEffect, useState } from "react";
import api from '../api'; // Import the Axios instance
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { Link } from 'react-router-dom';

export default function MyProjects() {
  const { auth } = useAuth(); // Get the user's account
  const [projects, setProjects] = useState([]); // State to hold projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/projects/client/${auth.account}`); // Fetch projects for the client
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); // Fetch projects when the component mounts
  }, [auth.account]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error}</p>;

  const handlePay = async (projectId) => {
    // Implement payment logic here
    alert(`Payment functionality for project ID ${projectId} to be implemented.`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded shadow p-4 mb-4">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="mb-2 text-white"><strong>Description:</strong> {project.description}</p>
              <p className="mb-2 text-white"><strong>Budget:</strong> {parseFloat(project.budget) / 1e18} ETH</p>
              <p className={`font-bold ${project.completed ? "text-green-500" : "text-red-500"}`}>
                {project.completed ? "Completed" : "In Progress"}
              </p>
              {project.completed && (
                <button
                  onClick={() => handlePay(project.id)} // Pass the project ID
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
                >
                  Pay
                </button>
              )}
              <Link to={`/clients/projects/${index+1}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
                View Project
              </Link>
              <Link 
                to={`/client/messages?address=${project.acceptedFreelancer}`} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
              >
                Chat with Freelancer
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}