import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from 'react';
import Wallet from "./pages/Wallet";
import JobListings from "./pages/JobListings";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import MyBids from "./pages/MyBids";
import MyJobs from "./pages/MyJobs";
import MyProjects from "./pages/MyProjects";
import Messages from "./pages/Messages";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });

  // ✅ Type the function parameters properly
  const saveState = ({ web3, contract, account }) => {
    setState({ web3, contract, account });
  };

  // ✅ Type the router correctly
  const router = createBrowserRouter([
    { path: "/", element: <Wallet saveState={saveState} /> },
    { path: "/jobs", element: <JobListings /> },
    { path: "/create-project", element: <CreateProject /> },
    { path: "/project/:id", element: <ProjectDetails /> },
    { path: "/my-bids", element: <MyBids /> },
    { path: "/my-jobs", element: <MyJobs /> },
    { path: "/my-projects", element: <MyProjects /> },
    { path: "/messages", element: <Messages /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App
