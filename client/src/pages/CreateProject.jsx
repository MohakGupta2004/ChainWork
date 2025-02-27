import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { web3 } from '../../config'; // Import the web3 instance

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const { auth } = useAuth(); // Get the user's account and contract instance

  const handleCreateProject = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Call the smart contract method to create a project
      const tx = await auth.contract.methods.createProject(
        title,
        description,
        web3.utils.toWei(budget, 'ether') // Convert budget to wei
      ).send({ from: auth.account });

      console.log(tx);
      alert(`Project "${title}" created successfully!`);
      
      // Reset the input fields after creating the project
      setTitle('');
      setDescription('');
      setBudget('');
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full py-28 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Create New Project</h1>
        <form onSubmit={handleCreateProject}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-left" htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded hover:border-2 hover:border-orange-500"
              placeholder="Enter project title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded hover:border-2 hover:border-orange-500"
              placeholder="Enter project description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-300 mb-2" htmlFor="budget">Budget (ETH)</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 mb-8 border rounded hover:border-2 hover:border-orange-500"
              placeholder="Enter project budget"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
