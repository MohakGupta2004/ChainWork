import React, { useEffect, useState } from "react";
import Web3 from "web3";
import PaymentABI from '../../../PaymentABI.json';

const ProfileModal = ({ isOpen, onClose, onLogout }) => {
  const [userBalance, setUserBalance] = useState("0");
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [amount, setAmount] = useState("");

  // Fetch user balance when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchUserBalance = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x9e2696928aF90D25452a368a58C2A272c28E6D25";
      const contract = new web3.eth.Contract(PaymentABI, contractAddress);

      try {
        const accounts = await web3.eth.getAccounts();
        const balance = await contract.methods.getBalance(accounts[0]).call();
        setUserBalance(web3.utils.fromWei(balance, "ether"));
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserBalance();
  }, [isOpen]);

  // Handle deposit transaction
  const handleDeposit = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x9e2696928aF90D25452a368a58C2A272c28E6D25";
    const contract = new web3.eth.Contract(PaymentABI, contractAddress);

    try {
      const accounts = await web3.eth.requestAccounts();
      await contract.methods.depositFunds().send({ 
        from: accounts[0], 
        value: web3.utils.toWei(amount, "ether") 
      });
      alert("Deposit successful!");

      // Reset the deposit form and refresh balance
      setAmount("");
      setShowDepositForm(false);
      const balance = await contract.methods.getBalance(accounts[0]).call();
      setUserBalance(web3.utils.fromWei(balance, "ether"));
    } catch (error) {
      console.error("Error depositing funds:", error);
      alert("Deposit failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-gray-800 bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-100">
        {showDepositForm ? (
          <>
            <h2 className="text-lg font-bold mb-4 text-orange-500">Deposit Funds</h2>
            <div className="mb-4">
              <input 
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-4 py-2 rounded bg-gray-700 text-white w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeposit}
                className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition-colors"
              >
                Confirm Deposit
              </button>
              <button
                onClick={() => setShowDepositForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4 text-orange-500">Profile</h2>
            <p className="text-gray-400 mt-4">Your Balance: {userBalance} ETH</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowDepositForm(true)}
                className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-600 transition-colors"
              >
                Deposit Funds
              </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
