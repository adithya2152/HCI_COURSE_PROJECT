import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import CareerMatcher from '../../components/features/CareerMatcher';
import { useLoadingState } from '../../hooks/useLoadingState';

// Career page implementing HCI principles
const Career: React.FC = () => {
  const { startLoading, finishLoading } = useLoadingState();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate page loading - system status visibility
  useEffect(() => {
    startLoading();
    
    // Simulate content loading
    const timer = setTimeout(() => {
      finishLoading();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [startLoading, finishLoading]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Career Matches</h1>
        <p className="mt-2 text-gray-600">
          Discover career paths that match your skills, experience, and interests.
        </p>
      </header>
      
      {/* Search and controls - implementing Shneiderman's principle of searchability */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for career paths..."
            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <Button
          variant="outline"
          icon={<Filter size={16} />}
          iconPosition="left"
        >
          Filters
        </Button>
        
        <Button
          variant="primary"
          icon={<Briefcase size={16} />}
          iconPosition="left"
        >
          Take Career Assessment
        </Button>
      </div>
      
      {/* Skills assessment - implementing user support */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-primary-900">Update Your Skills Profile</h2>
            <p className="mt-2 text-primary-700">
              Get more accurate career matches by updating your skills assessment.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button 
              variant="primary"
              className="whitespace-nowrap"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Update Skills
            </Button>
          </div>
        </div>
        
        {/* Skills progress - implementing visibility of system status */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-primary-900">Technical Skills</span>
              <span className="text-sm text-primary-700">75%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-primary-900">Soft Skills</span>
              <span className="text-sm text-primary-700">90%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-primary-900">Experience Level</span>
              <span className="text-sm text-primary-700">60%</span>
            </div>
            <div className="w-full bg-white rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Career matches - main content */}
      <CareerMatcher />
      
      {/* Career resources - implementing information architecture */}
      <section className="border-t border-gray-200 pt-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Resume workshop" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Resume Building Workshop</h3>
              <p className="mt-1 text-sm text-gray-600">
                Learn how to create a standout resume that highlights your skills and experience.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                View Workshop
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/7691792/pexels-photo-7691792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Interview preparation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Interview Preparation Guide</h3>
              <p className="mt-1 text-sm text-gray-600">
                Prepare for technical and behavioral interviews with our comprehensive guide.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Read Guide
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Networking events" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Networking Opportunities</h3>
              <p className="mt-1 text-sm text-gray-600">
                Discover events and communities to expand your professional network.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Find Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;