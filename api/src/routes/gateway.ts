import { Router } from 'express'
import {
  getAllProjectsByClient,
} from '../controllers/clientController'
import {
  getAllBidsByFreelancer,
  getBidsByProjectId,
  getAllProjects,
  getProjectDetails,
  getAllBidsForProject
} from '../controllers/freelancerController'

const router = Router()

// Client routes
//@ts-ignore
router.get('/projects/client/:clientId', getAllProjectsByClient) // Get all projects by client

// Freelancer routes
//@ts-ignore
router.get('/projects', getAllProjects) // Get all projects
//@ts-ignore
router.get('/bids/freelancer/:freelancerId', getAllBidsByFreelancer) // Get all bids by freelancer
//@ts-ignore
router.get('/bids/project/:projectId', getBidsByProjectId) // Get bids by project ID
//@ts-ignore
router.get('/bids/project/:projectId/all', getAllBidsForProject) // Get all bids for a specific project
//@ts-ignore
router.get('/projects/:id', getProjectDetails) // Get project details

export default router
