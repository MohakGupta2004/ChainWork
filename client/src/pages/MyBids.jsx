import React, { useEffect, useState } from 'react';
import api from '../api'; // Import the Axios instance
import Loader from '../components/Loader'; // Import the Loader component
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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) return <p>Error fetching bids: {error}</p>;

  return (
    <div className="p-4 my-4 mx-4">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">My Bids</h1>
      <div className={`grid gap-4 ${bids.length === 0 ? "text-center" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {bids.length === 0 ? (
          <p className="text-white">No bids found.</p>
        ) : (
          bids.map((bid, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 h-full border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300 flex flex-col justify-between">
              <div className='px-2'>
                <h2 className="text-lg font-semibold text-white ">{bid.client}</h2>
                <p className="text-md text-gray-400 mb-6">
                  <strong>Amount:</strong> {parseFloat(bid.amount) / 1e18} ETH
                </p>
                <p className={`font-bold ${bid.accepted ? "text-green-500" : "text-red-500"}`}>
                  {bid.accepted ? "Accepted" : "Pending"}
                </p>
                <p className="text-gray-400">Comment: {bid.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
