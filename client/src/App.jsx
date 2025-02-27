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
import { SocketProvider } from './context/SocketContext';
import { Footer } from './components/Footer';
import LandingPage from './pages/LandingPage'
import DepositFund from './pages/DepositFund';
// Layout component that includes Navbar
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

// Protected Route Component
const ProtectedRouteComponent = ({ allowedUserType }) => {
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
      element: <LandingPage />,
    },
    // {
    //   path: "/land",
    //   element: <LandingPage/>,
    // },
    {
      path: "/client",
      element: <ProtectedRouteComponent allowedUserType="client" />,
      children: [
        { path: "create-project", element: <CreateProject /> },
        { path: "my-projects", element: <MyProjects /> },
        { path: "messages", element: <Messages /> },
      ]
    },
    {
      path: "/freelancer",
      element: <ProtectedRouteComponent allowedUserType="freelancer" />,
      children: [
        { path: "jobs", element: <JobListings /> },
        { path: "my-bids", element: <MyBids /> },
        { path: "my-jobs", element: <MyJobs /> },
        { path: "messages", element: <Messages /> },
      ]
    },
    {
      path: "/project/:id",
      element: <ProtectedRouteComponent />,
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
      path: "/deposit-fund",
      element: <DepositFund/>
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
