import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Web3 from "web3"; // Import Web3 for Ethereum interaction
import PaymentABI from '../../../PaymentABI.json'; // Import the contract ABI

const ProfileModal = ({ isOpen, onClose, onLogout }) => {
  const [userBalance, setUserBalance] = useState("0");
  
  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Update with your contract address
      const contract = new web3.eth.Contract(PaymentABI, contractAddress);

      try {
        const accounts = await web3.eth.getAccounts(); // Get the current user's account
        console.log(accounts)
        const balance = await contract.methods.getBalance(accounts[0]).call(); // Call getBalance with the user's address
        setUserBalance(web3.utils.fromWei(balance, "ether")); // Convert from Wei to Ether
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserBalance(); // Fetch balance when the modal opens
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-gray-800 bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-100">
        <h2 className="text-lg font-bold mb-4 text-orange-500">Profile</h2>
        <p className="text-gray-400 mt-4">Your Balance: {userBalance} ETH</p>
        <div className="mt-4 flex justify-end space-x-4">
          <Link to={'/deposit-fund'}>
            <button className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition-colors">
              Deposit Funds
            </button>
          </Link>
          <button 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;