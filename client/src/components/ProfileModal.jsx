import React from 'react';
import { Link } from 'react-router-dom';
import DepositFund from '../pages/DepositFund';
const ProfileModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform duration-300 scale-100">
        <h2 className="text-lg font-bold mb-4 text-white">Logout</h2>
        <p className="text-gray-300">Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-end">
          <Link to={'/depositefund'}>
          <button>Deposite Funds</button>
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
      </div>
    </div>
  );
};

export default ProfileModal; 