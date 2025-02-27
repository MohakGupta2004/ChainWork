import React, { useEffect, useState } from "react";
import api from '../api'; // Import the Axios instance
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { Link } from 'react-router-dom';
import Web3 from "web3"; // Import Web3 for Ethereum interaction
import PaymentABI from '../../../PaymentABI.json'; // Import the contract ABI
import Loader from "../components/Loader";

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

  const handlePay = async (projectId, freelancerAddress, amountInEth) => {
    console.log(projectId, freelancerAddress, amountInEth);
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
  
    const web3 = new Web3(window.ethereum);
    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Update with your contract address
    const contract = new web3.eth.Contract(PaymentABI, contractAddress);
  
    // Convert the amount from ETH to Wei
    const amountInWei = web3.utils.toWei(amountInEth.toString(), "ether");
  
    try {
      const accounts = await web3.eth.requestAccounts();
      await contract.methods.releasePayment(freelancerAddress, amountInWei).send({ from: accounts[0] });
      alert("Payment released successfully!");
    } catch (error) {
      console.error("Error releasing payment:", error);
      alert("Payment release failed!");
    }
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  if (loading) {
    return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )};
  if (error) return <p>Error fetching projects: {error}</p>;
  
  return (
    <div className="p-4 my-4">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">My Projects</h1>
      <div className={`mx-auto grid gap-4 ${projects.length === 0 ? "text-center" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {projects.length === 0 ? (
          <p className="text-white">No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="text-md text-gray-400 mb-6">{truncateText(project.description, 100)}</p>
              <p className="text-md text-gray-400 mb-6">
                <span className="text-gray-400 font-medium">Budget: </span>
                <span className="text-white font-semibold">
                  {parseFloat(project.budget) / 1e18} ETH
                </span>
              </p>
              <p className={`font-bold my-2 py-2 ${project.completed ? "text-green-500" : "text-red-500"}`}>
                {project.completed ? "Completed" : "In Progress"}
              </p>
              {project.completed && (
                <button
                  onClick={() => handlePay(index, project.acceptedFreelancer, parseFloat(project.budget) / 1e18)} // Pass the project ID and budget
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 mt-2"
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