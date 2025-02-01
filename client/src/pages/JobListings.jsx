import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function JobListings() {
  const { id } = useParams();
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: "Web Development Project",
      description: "Build a responsive website using React and Node.js.",
      budget: "1.5 ETH",
      bids: [
        { freelancer: "0x1234...abcd", amount: "0.5 ETH", accepted: false },
        { freelancer: "0x5678...efgh", amount: "0.7 ETH", accepted: true },
      ],
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Create a mobile application for iOS and Android.",
      budget: "2.0 ETH",
      bids: [],
    },
    {
      id: 3,
      title: "Blockchain Integration",
      description: "Integrate blockchain technology into an existing application.",
      budget: "3.0 ETH",
      bids: [
        { freelancer: "0xabcd...1234", amount: "1.0 ETH", accepted: false },
      ],
    },
  ];

  const [bidAmount, setBidAmount] = useState('');

  const handleBid = (projectId) => {
    // Logic to handle bidding (e.g., call the smart contract function)
    alert(`Bid of ${bidAmount} ETH placed on project ID ${projectId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg shadow p-4 border border-gray-600">
            <Link to={`/project/${project.id}`} className="text-xl font-semibold text-white text-left">
              {project.title}
            </Link>
            <p className="mb-2 text-white text-left">{project.description}</p>
            <p className="font-bold mb-2 text-white text-left">
              Budget: {project.budget} <span role="img" aria-label="Ethereum">🪙</span>
            </p>
            <input
              type="number"
              step="0.01"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter your bid amount in ETH"
            />
            <button
              onClick={() => handleBid(project.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Place Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
