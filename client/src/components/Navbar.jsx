import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import LogoutModal from './LogoutModal';

function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clientLinks = [
    { to: '/client/create-project', text: 'Create Project' },
    { to: '/client/my-projects', text: 'My Projects' },
    { to: '/client/messages', text: 'Messages' },
  ];

  const freelancerLinks = [
    { to: '/freelancer/jobs', text: 'Find Jobs' },
    { to: '/freelancer/my-bids', text: 'My Bids' },
    { to: '/freelancer/my-jobs', text: 'My Jobs' },
    { to: '/freelancer/messages', text: 'Messages' },
  ];

  const currentLinks = auth.userType === 'client' ? clientLinks : 
                      auth.userType === 'freelancer' ? freelancerLinks : [];

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to the home page
    navigate('/');
  };

  return (
    <>
      <nav className="bg-black text-white">
        <div className="w-full">
          <div className="flex justify-between h-16 items-center px-4">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold hover:text-gray-300 transition-colors"
              >
                Work3
            </Link>
            </div>

            {/* Navigation Links */}
            {auth.account && (
              <div className="hidden md:flex space-x-8">
                {currentLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center px-1 pt-1 text-sm
                             border-b-2 border-transparent hover:border-white
                             transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            )}

            {/* Right side - Account/Logo */}
            <div className="flex items-center space-x-4">
              {auth.account && (
                <span 
                  className="hidden sm:inline-block px-4 py-2 text-sm bg-gray-800 rounded-full cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  {auth.account.slice(0, 6)}...{auth.account.slice(-4)}
              </span>
              )}
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center
                            font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                W3
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {auth.account && (
            <div className="md:hidden py-2 border-t border-gray-800">
              <div className="flex flex-col">
                {currentLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2 text-sm hover:bg-gray-800
                             transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
        </div>
          )}
      </div>
    </nav>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogout={handleLogout} 
      />
    </>
  );
}

export default Navbar;
