import { Zap } from 'lucide-react';

export default function NavbarLandingPage() {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold">ChainWork</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white">How it Works</a>
            <a href="#" className="text-gray-300 hover:text-white">Browse Jobs</a>
            <a href="#" className="text-gray-300 hover:text-white">For Clients</a>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              Connect Metamask
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}