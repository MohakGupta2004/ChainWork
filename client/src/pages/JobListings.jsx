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

    fetchProjects(); // Fetch projects when the component mounts
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 rounded shadow p-4 mb-4">
            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
            <p className="mb-2 text-white"><strong>Description:</strong> {project.description}</p>
            <p className="mb-2 text-white"><strong>Budget:</strong> {parseFloat(project.budget) / 1e18} ETH</p>
            <div className="flex justify-between mt-4">
              <Link to={`/project/${index + 1}`} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                View Details
              </Link>
              <Link to={`/project/${index + 1}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Bid
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}