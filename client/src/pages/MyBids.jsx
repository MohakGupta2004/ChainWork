import React from "react";

export default function MyBids() {
  // Dummy data for bids
  const bids = [
    { projectId: 1, projectTitle: "Web Development Project", amount: "0.5 ETH", comment: "I can do this!", accepted: false },
    { projectId: 2, projectTitle: "Mobile App Development", amount: "0.7 ETH", comment: "Looking forward to this project!", accepted: true },
    { projectId: 3, projectTitle: "Blockchain Integration", amount: "1.0 ETH", comment: "Excited to work on this!", accepted: false },
  ];

  return (
    <div className="p-4 flex justify-start">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Bids</h1>
        <div className="grid gap-4">
          {bids.map((bid, index) => (
            <div key={index} className="bg-blue-100 rounded-lg shadow p-4 border border-blue-300"> {/* Card with bluish colors */}
              <h2 className="text-xl font-semibold text-blue-800">{bid.projectTitle}</h2>
              <p className="mb-2 text-blue-600"><strong>Bid Amount:</strong> {bid.amount}</p>
              <p className="mb-2 text-blue-600"><strong>Comment:</strong> {bid.comment}</p>
              <p className={`font-bold ${bid.accepted ? "text-green-500" : "text-red-500"}`}>
                {bid.accepted ? "Accepted" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
