import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ProjectDetails() {
  const { id } = useParams();
  console.log("Project ID:", id);

  // Dummy data for the project (you can replace this with actual data fetching logic)
  const project = {
    title: "Web Development Project",
    description: "Build a responsive website using React and Node.js.",
    budget: "1.5 ETH",
    bids: [
      { freelancer: "0x1234...abcd", amount: "0.5 ETH", accepted: false, comment: "I can do this!" },
      { freelancer: "0x5678...efgh", amount: "0.7 ETH", accepted: true, comment: "Looking forward to this project!" },
    ],
  };

  const [bidAmount, setBidAmount] = useState('');
  const [bidComment, setBidComment] = useState('');

  const handlePlaceBid = () => {
    // Simulate placing a bid
    alert(`Bid of ${bidAmount} ETH placed with comment: "${bidComment}"`);
    // Reset the input fields after placing the bid
    setBidAmount('');
    setBidComment('');
  };

  return (
    <div className="p-4 flex justify-start">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-left">{project.title}</h1>
        <div className="bg-gray-800 rounded shadow p-4 mb-4">
          <p className="mb-2 text-white text-left"><strong>Description:</strong> {project.description}</p>
          <p className="mb-2 text-white text-left"><strong>Budget:</strong> {project.budget}</p>
        </div>

        <h2 className="text-xl font-bold mb-2 text-left">Bids</h2>
        <div className="bg-gray-800 rounded shadow p-4">
          {project.bids.length === 0 ? (
            <p className="text-white text-left">No bids placed yet.</p>
          ) : (
            <ul>
              {project.bids.map((bid, index) => (
                <li key={index} className="border-b py-2 text-white text-left">
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

        <h2 className="text-xl font-bold mb-2 text-left">Actions</h2>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2" htmlFor="bidAmount">Bid Amount (ETH)</label>
          <input
            type="number"
            step="0.01"
            id="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your bid amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2" htmlFor="bidComment">Comment</label>
          <textarea
            id="bidComment"
            value={bidComment}
            onChange={(e) => setBidComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your comment"
          />
        </div>
        <button
          onClick={handlePlaceBid}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}