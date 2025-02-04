import './App.css';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Wallet from "./pages/Wallet";
import JobListings from "./pages/JobListings";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import MyBids from "./pages/MyBids";
import MyJobs from "./pages/MyJobs";
import MyProjects from "./pages/MyProjects";
import Messages from "./pages/Messages";
import Navbar from './components/Navbar';
import ClientProjectDetails from './pages/ClientProjectDetails';

// Layout component that includes Navbar
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ allowedUserType }) => {
  const { auth } = useAuth();
  
  if (!auth.account) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedUserType && auth.userType !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return <Layout />;
};

// Error component for 404 and other errors
const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-4">Oops!</h1>
    <p className="text-xl mb-4">Sorry, page not found.</p>
    <a href="/" className="text-blue-500 hover:text-blue-700">
      Go back home
    </a>
  </div>
);

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wallet />,
    },
    {
      path: "/client",
      element: <ProtectedRoute allowedUserType="client" />,
      children: [
        { path: "create-project", element: <CreateProject /> },
        { path: "my-projects", element: <MyProjects /> },
        { path: "messages", element: <Messages /> },
      ]
    },
    {
      path: "/freelancer",
      element: <ProtectedRoute allowedUserType="freelancer" />,
      children: [
        { path: "jobs", element: <JobListings /> },
        { path: "my-bids", element: <MyBids /> },
        { path: "my-jobs", element: <MyJobs /> },
        { path: "messages", element: <Messages /> },
      ]
    },
    {
      path: "/project/:id",
      element: <ProtectedRoute />,
      children: [
        { index: true, element: <ProjectDetails /> }
      ]
    },
    {
      path: "/projects",
      element: <JobListings />,
    },
    {
      path: "/clients/projects/:id",
      element: <ClientProjectDetails />,
    },
    {
      path: "/my-bids",
      element: <MyBids />,
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

// Wrap the app with AuthProvider and ProjectProvider
function App() {
  return (
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
  );
}

export default App;
