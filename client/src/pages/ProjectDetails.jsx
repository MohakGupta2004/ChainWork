import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import the Axios instance
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { web3 } from '../../../config'; // Import the web3 instance

export default function ProjectDetails() {
  const { id } = useParams(); // Use id to match the route parameter
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bids, setBids] = useState([]); // State to hold bids
  const [bidAmount, setBidAmount] = useState(''); // State for bid amount
  const [bidComment, setBidComment] = useState(''); // State for bid comment
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
  
  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error fetching project details: {error}</p>;
  
  const handlePlaceBid = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const tx = await auth.contract.methods.placeBid(id, web3.utils.toWei(bidAmount, 'ether'), bidComment).send({
        from: auth.account,
        gas: 5000000, // Set a higher gas limit
      });
      console.log(tx);
      alert(`Bid of ${bidAmount} ETH placed successfully!`);
      
      // Reset the input fields after placing the bid
      setBidAmount('');
      setBidComment('');
      
      // Optionally, refetch bids to update the UI
      const response = await api.get(`/bids/project/${id}`);
      setBids(response.data);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  const handleDeleteProject = async () => {
    try {
      await auth.contract.methods.deleteProject(project.id).send({ from: auth.account });
      alert("Project deleted successfully!");
      // Optionally, redirect or update the UI
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Project Details</h1>
    {project && (
      <div className="bg-gray-800 rounded shadow p-4 mb-4">
        <h2 className="text-xl font-semibold text-white text-left">{project.title}</h2>
        <p className="mb-2 text-white text-left"><strong>Description:</strong> {project.description}</p>
        <p className="mb-2 text-white text-left"><strong>Budget:</strong> {parseFloat(project.budget) / 1e18} ETH</p>
        <p className={`font-bold text-left ${project.completed ? "text-green-500" : "text-red-500"}`}>
          {project.completed ? "Completed" : "In Progress"}
        </p>
      </div>
    )}
    
    <h2 className="text-xl font-bold mb-2">Bids from Other Freelancers</h2>
    <div className="bg-gray-700 rounded shadow p-4 mb-4">
      {bids.length === 0 ? (
        <p className="text-white">No bids placed yet.</p>
      ) : (
        <ul>
          {bids.map((bid, index) => (
            <li key={index} className="border-b py-2 text-white text-left">
              <span className="font-semibold">{bid.freelancer}</span>: {parseFloat(bid.amount) / 1e18} ETH - 
              <span className={bid.accepted ? "text-green-500" : "text-red-500"}>
                {bid.accepted ? "Accepted" : "Pending"}
              </span>
              <p className="text-gray-400">Comment: {bid.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    
    {/* Always show "Place a Bid" form */}
    <h2 className="text-xl font-bold mb-2">Place a Bid</h2>
    <form onSubmit={handlePlaceBid} className="mb-4">
      <div className="mb-4">
        <label className="block text-gray-800 mb-2" htmlFor="bidAmount">Bid Amount (ETH)</label>
        <input
          type="number"
          id="bidAmount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter your bid amount"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 mb-2" htmlFor="bidComment">Bid Comment</label>
        <textarea
          id="bidComment"
          value={bidComment}
          onChange={(e) => setBidComment(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter your comment"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Place Bid
      </button>
    </form>
  </div>
    );
}
