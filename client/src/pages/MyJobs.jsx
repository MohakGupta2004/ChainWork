import React from "react";

export default function MyJobs() {
  // Dummy data for accepted jobs
  const acceptedJobs = [
    { jobId: 1, title: "Web Development Project", client: "0xClientAddress1", budget: "1.5 ETH", status: "Accepted" },
    { jobId: 2, title: "Mobile App Development", client: "0xClientAddress2", budget: "2.0 ETH", status: "Accepted" },
    { jobId: 3, title: "Blockchain Integration", client: "0xClientAddress3", budget: "3.0 ETH", status: "Accepted" },
  ];

  return (
    <div className="p-4 flex justify-start">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Accepted Jobs</h1>
        <div className="grid gap-4">
          {acceptedJobs.map((job, index) => (
            <div key={index} className="bg-blue-100 rounded-lg shadow p-4 border border-blue-300"> {/* Card with bluish colors */}
              <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
              <p className="mb-2 text-blue-600"><strong>Client:</strong> {job.client}</p>
              <p className="mb-2 text-blue-600"><strong>Budget:</strong> {job.budget}</p>
              <p className={`font-bold text-green-500`}>{job.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}