import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Import the Axios instance

export default function JobListings() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects'); // Fetch all projects
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error}</p>;

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow p-4 border border-gray-600">
            <h2 className="text-xl font-semibold text-white text-left">{project.title}</h2>
            <p className="mb-2 text-white text-left"><strong>Description:</strong> {project.description}</p>
            <p className="mb-2 text-white text-left"><strong>Budget:</strong> {parseFloat(project.budget) / 1e18} ETH</p>
            <p className={`font-bold text-left ${project.approved ? "text-green-300" : "text-red-300"}`}>
              {project.approved ? "Approved" : "Pending Approval"}
            </p>
            <div className="flex justify-between mt-4">
              <Link to={`/projects/${index+1}`} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                View Details
              </Link>
              <button
                onClick={() => alert(`Bid placed on project: ${project.title}`)} // Placeholder for bid functionality
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}