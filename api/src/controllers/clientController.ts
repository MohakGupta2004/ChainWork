//@ts-ignore
import { Request, Response } from 'express';
import { contract } from '../../config';

// Get all projects by client
export const getAllProjectsByClient = async (req: Request, res: Response) => {
  const clientId: string = req.params.clientId;
  
  try {
    const projects = await contract.methods.getAllProjectsByClient(clientId).call();
    
    // Map and format the projects with proper typing
    //@ts-ignore
    const formattedProjects = projects.map((project: {
      id: number;
      title: string;
      description: string;
      budget: string;
      client: string;
      acceptedFreelancer: string;
      completed: boolean;
      approved: boolean;
      approvalTimestamp: string;
    }) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      budget: project.budget.toString(), // Convert BigInt to string
      client: project.client,
      acceptedFreelancer: project.acceptedFreelancer,
      completed: project.completed,
      approved: project.approved,
      approvalTimestamp: project.approvalTimestamp.toString()
    }));

    res.json(formattedProjects);
  } catch (error: unknown) {
    console.error("Error fetching client projects:", error);
    
    if (error instanceof Error) {
      res.status(500).json({ 
        message: "Error fetching client projects", 
        error: error.message 
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};

