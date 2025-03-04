import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import the Axios instance
import Loader from '../components/Loader'; // Import the Loader component
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useAuth } from '../context/AuthContext'; // Import the Auth context

export default function ClientProjectDetails() {
  const { id } = useParams(); // Use id to match the route parameter
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]); // State to hold bids
  const { auth } = useAuth(); // Get the user's account and contract instance

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`/projects/${id}`); // Fetch project details
        setProject(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBids = async () => {
      try {
        const response = await api.get(`/bids/project/${id}`); // Fetch bids for the project
        setBids(response.data);
      } catch (err) {
        console.error("Error fetching bids:", err.message);
      }
    };

    fetchProjectDetails();
    fetchBids(); // Fetch bids when the component mounts
  }, [id]);

  if (loading) {
    return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )};
  if (error) return <p>Error fetching project details: {error}</p>;

  const handleAcceptBid = async (bidIndex) => {
    try {
      const tx = await auth.contract.methods.acceptBid(id, bidIndex).send({
        from: auth.account,
        gas: 5000000, // Set a higher gas limit
      });
      console.log(tx);
      alert(`Bid accepted successfully!`);

      // Optionally, refetch bids to update the UI
      const response = await api.get(`/bids/project/${id}`);
      setBids(response.data);
    } catch (error) {
      console.error("Error accepting bid:", error);
      alert("Failed to accept bid. Please try again.");
    }
  };

  const handleMarkAsComplete = async () => {
    try {
      await auth.contract.methods.markAsCompleted(id).send({ from: auth.account });
      alert("Project marked as completed!");
      // Optionally, refetch project details to update the UI
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error marking project as completed:", error);
      alert("Failed to mark project as completed. Please try again.");
    }
  };

  const handlePay = async () => {
    // Implement payment logic here
    alert("Payment functionality to be implemented.");
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 flex">
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Project Details</h1>
          {project && (
            <div className="bg-gray-800 rounded shadow p-4 mb-4 border border-gray-600 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="text-md text-gray-400 mb-6 py-6 px-4 justify-evenly text-justify">{project.description}</p>
              <div className="flex justify-between items-center mb-6 px-4">
                <span className="text-gray-400 font-medium">Budget: </span>
                <span className="text-white font-semibold">
                  {parseFloat(project.budget) / 1e18} ETH
                </span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-gray-400 font-medium">Status: </span>
                <span className={`font-bold ${project.completed ? "text-green-500" : "text-red-500"}`}>
                  {project.completed ? "Completed" : "In Progress"}
                </span>
              </div>
              {project.completed && (
                <button
                  onClick={handlePay}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2"
                >
                  Pay
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-1/2 p-4 mt-2">
          <h2 className="text-xl font-bold mb-4">Bids from Freelancers</h2>
          <div className="bg-gray-800 rounded shadow p-4 mb-4 border border-gray-600 hover:shadow-lg transition-shadow duration-300">
            {bids.length === 0 ? (
              <p className="text-white">No bids placed yet.</p>
            ) : (
              <ul>
                {bids.map((bid, index) => (
                  <li key={index} className="border-b py-2 text-white">
                    <span className="font-semibold">{bid.freelancer}</span>: {parseFloat(bid.amount) / 1e18} ETH - 
                    <span className={bid.accepted ? "text-green-500" : "text-red-500"}>
                      {bid.accepted ? "Accepted" : "Pending"}
                    </span>
                    <p className="text-gray-400">Comment: {bid.comment}</p>
                    {!bid.accepted && ( // Only show the button if the bid is not accepted
                      <button
                        onClick={() => handleAcceptBid(index)} // Pass the index of the bid
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                      >
                        Accept Bid
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
