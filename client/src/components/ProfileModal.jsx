import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DepositFund from '../pages/DepositFund';
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-100">
        <h2 className="text-lg font-bold mb-4 text-white">Profile</h2>
        <p className="text-gray-300"></p>
        <div className="mt-4 flex justify-end">
          <Link to={'/depositefund'}>
            <button>Deposit Funds</button>
          </Link>
          
          <button 
            className="mr-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
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
        <p className="text-gray-300 mt-4">Your Balance: {userBalance} ETH</p>
      </div>
    </div>
  );
};

export default ProfileModal; 