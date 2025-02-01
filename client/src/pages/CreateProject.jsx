import React, { useState } from 'react';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Project</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter project title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter project description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="budget">Budget (ETH)</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter project budget"
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}