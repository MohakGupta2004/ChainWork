import React, { useState } from 'react';

export default function ViewBids() {
  const [projectId, setProjectId] = useState('');
  const [bids, setBids] = useState([]);
  const { contract } = useWeb3(); // Get the contract from your Web3 context

  const fetchBids = async () => {
    try {
      const bidsData = await contract.getBidsByProjectId(projectId);
      setBids(bidsData);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">View Bids</h1>
      <input
        type="number"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter Project ID"
      />
      <button
        onClick={fetchBids}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Bids
      </button>

      <div className="mt-4">
        {bids.length === 0 ? (
          <p>No bids found for this project.</p>
        ) : (
          <ul>
            {bids.map((bid, index) => (
              <li key={index} className="border-b py-2">
                <span className="font-semibold">{bid.freelancer}</span>: {bid.amount} - 
                <span className={bid.accepted ? "text-green-500" : "text-red-500"}>
                  {bid.accepted ? "Accepted" : "Pending"}
                </span>
                <p className="text-gray-400">Comment: {bid.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 