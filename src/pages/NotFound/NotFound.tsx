import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, HelpCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

// 404 page implementing user support
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-8">
        <div className="text-primary-600 text-9xl font-bold">404</div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button 
            variant="primary"
            icon={<Home size={16} />}
            iconPosition="left"
          >
            Go to Home
          </Button>
        </Link>
        
        <Link to="/chat">
          <Button 
            variant="outline"
            icon={<HelpCircle size={16} />}
            iconPosition="left"
          >
            Get Help
          </Button>
        </Link>
      </div>
      
      {/* Search box to help users find what they need */}
      <div className="mt-12 max-w-md w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for learning paths, careers, or topics..."
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      {/* Quick links for common pages - implementing recovery from errors */}
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-600 mb-4">Popular Pages</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link 
            to="/learning" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            Learning Paths
          </Link>
          <Link 
            to="/career" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            Career Matches
          </Link>
          <Link 
            to="/profile" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            Profile
          </Link>
          <Link 
            to="/chat" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            AI Assistant
          </Link>
          <Link 
            to="/accessibility" 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            Accessibility
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;