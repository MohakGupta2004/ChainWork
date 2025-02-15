import React, { useEffect, useState } from 'react';
import api from '../api'; // Import the Axios instance
import { useAuth } from '../context/AuthContext'; // Import the Auth context

export default function MyBids() {
  const { auth } = useAuth(); // Get the user's account
  const [bids, setBids] = useState([]); // State to hold bids
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        console.log("Fetching bids for account:", auth.account);
        const response = await api.get(`/bids/freelancer/${auth.account}`);
        console.log("Response data:", response.data);
        setBids(response.data);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [auth.account]);

  if (loading) return <p>Loading bids...</p>;
  if (error) return <p>Error fetching bids: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>
      <div className="grid gap-4">
        {bids.length === 0 ? (
          <p>No bids found.</p>
        ) : (
          bids.map((bid, index) => (
            <div key={index} className="bg-gray-800 rounded shadow p-4 mb-4">
              <h2 className="text-xl font-semibold text-white">{bid.client}</h2>
              <p className="mb-2 text-white"><strong>Amount:</strong> {parseFloat(bid.amount) / 1e18} ETH</p>
              <p className={`font-bold ${bid.accepted ? "text-green-500" : "text-red-500"}`}>
                {bid.accepted ? "Accepted" : "Pending"}
              </p>
              <p className="text-gray-400">Comment: {bid.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
