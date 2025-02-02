//@ts-ignore
import { Request, Response } from 'express';
import { contract } from "../../../config";

// Define a type for the Bid
interface Bid {
  freelancer: string;
  amount: string; // Amount in wei (string to handle large numbers)
  accepted: boolean;
  comment: string;
}

// Define a type for the Project
interface Project {
  id: number;
  title: string;
  description: string;
  budget: string; // Budget in wei (string to handle large numbers)
  client: string;
  acceptedFreelancer: string;
  completed: boolean;
  approved: boolean;
  approvalTimestamp: string; // Convert to string for JSON serialization
}

// Get all bids by freelancer
export const getAllBidsByFreelancer = async (req: Request, res: Response) => {
  const freelancerId: string = req.params.freelancerId; // Ensure freelancerId is a string
  try {
    const bids: Bid[] = await contract.methods.getAllBidsByFreelancer(freelancerId).call();
    console.log("Bids:", bids);
    
    // Map through the bids if it's an array
    const formattedBids = bids.map((bid: Bid) => ({
      freelancer: bid.freelancer,
      amount: bid.amount.toString(), // Convert BigInt to string
      accepted: bid.accepted,
      comment: bid.comment
    }));

    res.json(formattedBids);
  } catch (error: any) {
    console.log("Error fetching bids:", error);
    res.status(500).json({ message: "Error fetching bids", error: error.message });
  }
};

// Get bids by project ID
export const getBidsByProjectId = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.projectId);
  console.log(projectId)
  if (isNaN(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const bids: Bid[] = await contract.methods.getBidsByProjectId(projectId).call();
    
    const formattedBids = bids.map((bid: Bid) => ({
      freelancer: bid.freelancer,
      amount: bid.amount.toString(),
      accepted: bid.accepted,
      comment: bid.comment
    }));

    res.json(formattedBids);
  } catch (error: any) {
    console.error("Error fetching bids by project ID:", error);
    res.status(500).json({ 
      message: "Error fetching bids by project ID", 
      error: error.message 
    });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects: Project[] = await contract.methods.getAllProjects().call();
    
    // Map and format the projects 
    const formattedProjects = projects.map((project: Project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      budget: project.budget.toString(),
      client: project.client,
      acceptedFreelancer: project.acceptedFreelancer,
      completed: project.completed,
      approved: project.approved,
      approvalTimestamp: project.approvalTimestamp.toString(),
    }));

    res.json(formattedProjects);
  } catch (error: any) {
    console.error("Error fetching all projects:", error);
    res.status(500).json({
      message: "Error fetching all projects",
      error: error.message
    });
  }
};

// Get project details
export const getProjectDetails = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params._id); // Get the project ID from the request parameters
  console.log("Received request for project ID:", projectId); // Log the project ID
  if (isNaN(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const project: Project = await contract.methods.getProject(projectId).call(); // Call the smart contract method to get project details
    console.log("Project Details:", project); // Log the project details

    // Format the project details with safe BigInt handling
    const formattedProject = {
      id: projectId,
      title: project.title,
      description: project.description,
      budget: project.budget.toString(), // Convert BigInt to string
      acceptedFreelancer: project.acceptedFreelancer,
      completed: project.completed,
    };

    res.json(formattedProject); // Send the formatted project details as a response
  } catch (error: unknown) {
    console.error("Error fetching project details:", error);

    if (error instanceof Error) {
      res.status(500).json({ message: "Error fetching project details", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

// Get all bids for a specific project (if needed for freelancer)
export const getAllBidsForProject = async (req: Request, res: Response) => {
  const projectId: number = parseInt(req.params.projectId);
  
  if (isNaN(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const bids = await contract.methods.getBidsByProjectId(projectId).call();
    console.log("Bids for project", projectId, ":", bids);

    // Format the bids with proper typing
    //@ts-ignore
    const formattedBids = bids.map((bid: any) => ({
      freelancer: bid.freelancer,
      amount: bid.amount.toString(), // Convert BigInt to string
      comment: bid.comment,
      accepted: bid.accepted,
    }));

    res.json(formattedBids);
  } catch (error: unknown) {
    console.error("Error fetching bids for project:", error);
    
    if (error instanceof Error) {
      res.status(500).json({ 
        message: "Error fetching bids for project", 
        error: error.message 
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
