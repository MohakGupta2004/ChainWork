import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Import the Axios instance
import Loader from '../components/Loader';

export default function JobListings() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Error fetching projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black/50 min-h-screen text-white py-10">
      {/* Header / Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Job Listings</h1>
        <p className="text-gray-400 mt-2">
          The Next Level of Web3 Freelancing
        </p>
      </div>

      {/* Container for listings */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-4">
                {project.title}
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                {truncateText(project.description, 100)}
              </p>
              <div className="mb-4">
                <span className="text-gray-400 font-medium">Budget: </span>
                <span className="text-white font-semibold">
                  {parseFloat(project.budget) / 1e18} ETH
                </span>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row sm:justify-end gap-2">
                <Link
                  to={`/project/${index + 1}`}
                  className="border border-orange-500 text-orange-400 px-4 py-2 rounded-md text-center hover:bg-orange-500 hover:text-black transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/project/${index + 1}`}
                  className="bg-orange-400 text-black px-4 py-2 rounded-md text-center hover:bg-orange-500 transition-colors"
                >
                  Bid
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
