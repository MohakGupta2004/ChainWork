import React, { useEffect, useState } from "react";
import api from '../api'; // Import the Axios instance
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'; // Import the Loader component

export default function MyJobs() {
  const { auth } = useAuth(); // Get the user's account
  const [acceptedBids, setAcceptedBids] = useState([]); // State to hold accepted bids
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedBids = async () => {
      try {
        const response = await api.get(`/bids/freelancer/${auth.account}`); // Fetch bids for the freelancer
        const filteredBids = response.data.filter(bid => bid.accepted); // Filter only accepted bids
        setAcceptedBids(filteredBids);
        console.log(response.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedBids(); // Fetch accepted bids when the component mounts
  }, [auth.account]);

  const handleMarkAsComplete = async (projectId) => {
    try {
      const tx = await auth.contract.methods.markProjectCompleted(projectId).send({ from: auth.account });
      alert("Project marked as completed!");
      console.log(tx);

      // Refetch accepted bids to update the UI
      const response = await api.get(`/bids/freelancer/${auth.account}`);
      const filteredBids = response.data.filter(bid => bid.accepted); // Filter only accepted bids
      setAcceptedBids(filteredBids);
    } catch (error) {
      console.error("Error marking project as completed:", error);
      alert("Failed to mark project as completed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) return <p>Error fetching accepted bids: {error}</p>;

  return (
    <div className="p-4 my-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">Accepted Bids</h1>
      <div className={`grid gap-4 ${acceptedBids.length === 0 ? "text-center" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {acceptedBids.length === 0 ? (
          <p className="text-white">No accepted bids found.</p>
        ) : (
          acceptedBids.map((bid, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{bid.projectTitle}</h2>
                <p className="text-md text-gray-400 mb-6">
                  <strong>Bid Amount:</strong> {parseFloat(bid.amount) / 1e18} ETH
                </p>
                <p className="text-md text-gray-400 mb-6">
                  <strong>Comment:</strong> {bid.comment}
                </p>
                <div className="flex justify-between items-center">
                  <Link to={`/clients/projects/${index+1}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
                    View Project
                  </Link>
                  <Link 
                    to={`/freelancer/messages?address=${bid.client}`} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                  >
                    Chat with Client
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                {bid.completed ? (
                  <button className="bg-gray-500 text-white px-4 py-2 rounded w-full" disabled>
                    Completed!
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAsComplete(index+1)} // Pass the project ID
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}