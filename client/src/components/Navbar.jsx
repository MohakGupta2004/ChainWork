import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Zap } from 'lucide-react';
import ProfileModal from './ProfileModal';


function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clientLinks = [
    { to: '/client/create-project', text: 'Create Project' },
    { to: '/client/my-projects', text: 'My Projects' },
    { to: '/client/messages', text: 'Messages' }
  ];

  const freelancerLinks = [
    { to: '/freelancer/jobs', text: 'Find Jobs' },
    { to: '/freelancer/my-bids', text: 'My Bids' },
    { to: '/freelancer/my-jobs', text: 'My Jobs' },
    { to: '/freelancer/messages', text: 'Messages' }
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
      <nav className="border-b border-[var(--border-color)]">
        <div className="w-full">
          <div className="flex justify-between h-16 items-center px-4">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold transition-colors"
              >
                <div className="flex items-center">
            <Zap className="h-8 w-8 text-[var(--bg-color)]" />
            <span className="ml-2 text-xl font-bold">ChainWork</span>
          </div>
            </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">

            {/* Navigation Links */}
            {auth.account && (
              <div className="hidden md:flex space-x-8">
                {currentLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center px-1 pt-1 text-sm
                             border-b-2 border-transparent text-[var(--text-color)] hover:text-[var(--text-color-hover)]
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
                  className="hidden sm:inline-block px-4 py-2 text-sm bg-[var(--border-color)] rounded-full cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  {auth.account.slice(0, 6)}...{auth.account.slice(-4)}
              </span>
              )}
              <div className="w-10 h-10 bg-[var(--bg-color)] text-[var()] rounded-full flex items-center justify-center
                            font-bold text-sm hover:bg-[var(--bg-deep-color)] transition-colors cursor-pointer">
                W3
              </div>
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
                  </Link>
                ))}
              </div>
        </div>
          )}
      </div>
    </nav>

      {/* Logout Modal */}
      <ProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogout={handleLogout} 
      />
    </>
  );
}

export default Navbar;
