import React from "react";

export default function MyJobs() {
  // Dummy data for jobs
  const jobs = [
    { jobId: 1, title: "Web Development Project", client: "0xClientAddress1", budget: "1.5 ETH", approved: false },
    { jobId: 2, title: "Mobile App Development", client: "0xClientAddress2", budget: "2.0 ETH", approved: true },
    { jobId: 3, title: "Blockchain Integration", client: "0xClientAddress3", budget: "3.0 ETH", approved: false },
  ];

  const handleApprove = (jobId) => {
    // Logic to approve the job (to be implemented)
    alert(`Job ${jobId} approved!`);
  };

  const handleCancelApproval = (jobId) => {
    // Logic to cancel approval (to be implemented)
    alert(`Approval for job ${jobId} canceled!`);
  };

  return (
    <div className="p-4 flex justify-start">
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">My Jobs</h1>
        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-blue-100 rounded-lg shadow p-4 border border-blue-300">
              <h2 className="text-xl font-semibold text-blue-800">{job.title}</h2>
              <p className="mb-2 text-blue-600"><strong>Client:</strong> {job.client}</p>
              <p className="mb-2 text-blue-600"><strong>Budget:</strong> {job.budget}</p>
              <p className={`font-bold ${job.approved ? "text-green-500" : "text-red-500"}`}>
                {job.approved ? "Approved" : "Pending Approval"}
              </p>
              {!job.approved ? (
                <button
                  onClick={() => handleApprove(job.jobId)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Approve Job
                </button>
              ) : (
                <button
                  onClick={() => handleCancelApproval(job.jobId)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Approval
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}